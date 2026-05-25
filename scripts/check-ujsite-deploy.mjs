const BASE_URL = 'https://dandelionhouse.hu';
const HOME_URL = `${BASE_URL}/`;

const criticalPages = [
  `${BASE_URL}/`,
  `${BASE_URL}/cs/`,
  `${BASE_URL}/szallasok`,
  `${BASE_URL}/dandelion-d2/`,
];
const royalAliasUrl = `${BASE_URL}/dandelion-royal-homes`;
const royalCanonicalUrl = `${BASE_URL}/royal/`;

const adminUrl = `${BASE_URL}/_local/image-admin`;
const fetchHeaders = {
  'user-agent': 'dandelion-root-deploy-check/1.0',
  'cache-control': 'no-cache',
  pragma: 'no-cache',
};
const RETRY_DELAYS_MS = [0, 2500, 5000];
const FLAKY_ROUTE_SAMPLE_COUNT = 8;
const WARN_ONLY_FOR_ROUTE_STABILITY =
  process.env.DND_ROUTE_STABILITY_WARN_ONLY === '1' ||
  process.env.DND_ROUTE_STABILITY_WARN_ONLY === 'true';

let hasFailure = false;
let hasWarning = false;
let failureCount = 0;
const htmlByUrl = new Map();

function pathLabel(url) {
  return new URL(url).pathname;
}

function canonicalDirectoryUrl(url) {
  const parsed = new URL(url);

  if (parsed.pathname.endsWith('/')) {
    return parsed.href;
  }

  parsed.pathname = `${parsed.pathname}/`;
  return parsed.href;
}

function fail(message) {
  hasFailure = true;
  failureCount += 1;
  console.error(`[FAIL] ${message}`);
}

function warn(message) {
  hasWarning = true;
  console.warn(`[WARN] ${message}`);
}

function ok(message) {
  console.log(`[OK] ${message}`);
}

function routeStabilityIssue(message) {
  if (WARN_ONLY_FOR_ROUTE_STABILITY) {
    warn(message);
    return;
  }

  fail(message);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withRetry(action) {
  let lastError;

  for (let attempt = 0; attempt < RETRY_DELAYS_MS.length; attempt += 1) {
    const delay = RETRY_DELAYS_MS[attempt];

    if (delay > 0) {
      await sleep(delay);
    }

    try {
      return await action();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

function isSelfRedirectHtml(url, html) {
  const canonicalPattern = /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i;
  const refreshPattern = /<meta[^>]+http-equiv=["']refresh["'][^>]+content=["'][^"']*url=([^"';]+)[^"']*["']/i;
  const canonicalMatch = html.match(canonicalPattern);
  const refreshMatch = html.match(refreshPattern);

  if (!canonicalMatch || !refreshMatch) {
    return false;
  }

  const resolvedUrl = new URL(url).href;
  const resolvedCanonical = new URL(canonicalMatch[1], BASE_URL).href;
  const resolvedRefresh = new URL(refreshMatch[1], BASE_URL).href;

  return resolvedCanonical === resolvedUrl && resolvedRefresh === resolvedUrl;
}

async function fetchText(url) {
  return withRetry(async () => {
    const response = await fetch(url, {
      headers: fetchHeaders,
      redirect: 'follow',
    });

    if (response.status >= 500) {
      throw new Error(`HTTP ${response.status}`);
    }

    const text = await response.text();
    return { response, text };
  });
}

async function fetchStatus(url) {
  return withRetry(async () => {
    const response = await fetch(url, {
      headers: fetchHeaders,
      redirect: 'follow',
    });

    if (response.status >= 500) {
      throw new Error(`HTTP ${response.status}`);
    }

    await response.arrayBuffer();
    return response;
  });
}

async function fetchStatusNoRetry(url) {
  const response = await fetch(url, {
    headers: fetchHeaders,
    redirect: 'manual',
  });

  await response.arrayBuffer();
  return response;
}

function findAssetUrls(html, attribute, extension) {
  const pattern = new RegExp(`${attribute}=["']([^"']+\\.${extension}(?:\\?[^"']*)?)["']`, 'gi');
  const urls = new Set();
  let match;

  while ((match = pattern.exec(html)) !== null) {
    const assetUrl = new URL(match[1], HOME_URL);

    if (assetUrl.origin === BASE_URL) {
      urls.add(assetUrl.href);
    }
  }

  return [...urls];
}

async function checkCriticalPages() {
  for (const url of criticalPages) {
    try {
      const { response, text } = await fetchText(url);

      if (response.status === 200) {
        if (isSelfRedirectHtml(url, text)) {
          fail(`${pathLabel(url)} is serving a self-redirect HTML shell instead of page content`);
        } else {
          ok(`${pathLabel(url)} 200`);
        }
        htmlByUrl.set(url, text);
      } else {
        fail(`${pathLabel(url)} did not return 200: ${response.status}`);
      }
    } catch (error) {
      fail(`${pathLabel(url)} is not reachable: ${error.message}`);
    }
  }
}

async function checkRouteStability() {
  for (const url of criticalPages) {
    const samples = [];

    for (let attempt = 0; attempt < FLAKY_ROUTE_SAMPLE_COUNT; attempt += 1) {
      try {
        const response = await fetchStatusNoRetry(url);
        samples.push({
          status: response.status,
          location: response.headers.get('location'),
          server: response.headers.get('server'),
        });
      } catch (error) {
        samples.push({
          error: error.message,
        });
      }
    }

    const statusSummary = samples
      .map((sample, index) => {
        if (sample.error) {
          return `${index + 1}:ERR(${sample.error})`;
        }

        const locationSuffix = sample.location ? `->${sample.location}` : '';
        return `${index + 1}:${sample.status}${locationSuffix}`;
      })
      .join(', ');

    const uniqueOutcomes = new Set(
      samples.map((sample) =>
        sample.error
          ? `ERR:${sample.error}`
          : `${sample.status}:${sample.location ?? '-'}`
      )
    );

    if (uniqueOutcomes.size > 1) {
      routeStabilityIssue(`${pathLabel(url)} is flaky across repeated requests: ${statusSummary}`);
      continue;
    }

    const firstSample = samples[0];

    if (firstSample?.error) {
      routeStabilityIssue(`${pathLabel(url)} stability probe failed: ${firstSample.error}`);
      continue;
    }

    if (firstSample?.status === 200) {
      ok(`${pathLabel(url)} is stable across ${FLAKY_ROUTE_SAMPLE_COUNT} repeated requests`);
      continue;
    }

    const expectedRedirectUrl = canonicalDirectoryUrl(url);
    const isAcceptedRedirect =
      (firstSample?.status === 301 || firstSample?.status === 308) &&
      firstSample?.location === expectedRedirectUrl;

    if (isAcceptedRedirect) {
      ok(
        `${pathLabel(url)} is stable across ${FLAKY_ROUTE_SAMPLE_COUNT} repeated requests via canonical redirect`
      );
      continue;
    }

    if (firstSample?.status !== 200) {
      routeStabilityIssue(`${pathLabel(url)} stability probe did not stay on 200: ${statusSummary}`);
      continue;
    }
  }
}

async function checkAssetStatuses(assetUrls, assetType) {
  for (const url of assetUrls) {
    try {
      const response = await fetchStatus(url);

      if (response.status !== 200) {
        fail(`${assetType} asset did not return 200: ${url} (${response.status})`);
      }
    } catch (error) {
      fail(`${assetType} asset is not reachable: ${url} (${error.message})`);
    }
  }
}

async function checkAssets() {
  const homeHtml = htmlByUrl.get(HOME_URL);

  if (!homeHtml) {
    fail('/ HTML is not available for asset checks');
    return;
  }

  if (/(?:href|src)=["']\/ujsite\//i.test(homeHtml)) {
    fail('Root HTML still contains /ujsite/ references');
  } else {
    ok('Root asset and link references look correct');
  }

  const cssAssetUrls = findAssetUrls(homeHtml, 'href', 'css');
  const hasInlineStyles = /<style(?:\s|>)/i.test(homeHtml);

  if (cssAssetUrls.length === 0) {
    if (hasInlineStyles) {
      ok('Inline CSS detected in root HTML');
    } else {
      fail('No Astro CSS asset or inline styles found in root HTML');
    }
  } else {
    const failureCountBeforeCss = failureCount;
    await checkAssetStatuses(cssAssetUrls, 'CSS');

    if (failureCount === failureCountBeforeCss) {
      ok('CSS assets load correctly');
    }
  }

  const jsAssetUrls = findAssetUrls(homeHtml, 'src', 'js');

  if (jsAssetUrls.length === 0) {
    ok('No Astro JS asset present, this is acceptable');
  } else {
    const failureCountBeforeJs = failureCount;
    await checkAssetStatuses(jsAssetUrls, 'JS');

    if (failureCount === failureCountBeforeJs) {
      ok('JS assets load correctly');
    }
  }
}

async function checkAdminRoute() {
  try {
    const response = await fetchStatus(adminUrl);

    if (response.status === 200) {
      fail('_local admin route is publicly reachable with 200');
    } else {
      ok('_local admin route is not publicly reachable');
    }
  } catch (error) {
    ok(`_local admin route is not reachable (${error.message})`);
  }
}

async function checkRoyalAliasRedirect() {
  try {
    const { response, text } = await fetchText(royalAliasUrl);

    if (response.status !== 200) {
      fail(`/dandelion-royal-homes did not return 200 redirect page: ${response.status}`);
      return;
    }

    const canonicalPattern = /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i;
    const refreshPattern = /<meta[^>]+http-equiv=["']refresh["'][^>]+content=["'][^"']*url=([^"';]+)[^"']*["']/i;
    const canonicalMatch = text.match(canonicalPattern);
    const refreshMatch = text.match(refreshPattern);

    if (!canonicalMatch) {
      fail('/dandelion-royal-homes redirect page is missing canonical link');
      return;
    }

    if (!refreshMatch) {
      fail('/dandelion-royal-homes redirect page is missing meta refresh');
      return;
    }

    const resolvedCanonical = new URL(canonicalMatch[1], BASE_URL).href;
    const resolvedRefresh = new URL(refreshMatch[1], BASE_URL).href;

    if (resolvedCanonical !== royalCanonicalUrl) {
      fail(`/dandelion-royal-homes canonical target is unexpected: ${resolvedCanonical}`);
      return;
    }

    if (resolvedRefresh !== royalCanonicalUrl) {
      fail(`/dandelion-royal-homes meta refresh target is unexpected: ${resolvedRefresh}`);
      return;
    }

    ok('/dandelion-royal-homes Astro redirect page points to /royal/');
  } catch (error) {
    fail(`/dandelion-royal-homes redirect check failed: ${error.message}`);
  }
}

function checkBookingCta() {
  const htmlToCheck = [
    htmlByUrl.get(HOME_URL),
    htmlByUrl.get(`${BASE_URL}/dandelion-d2/`),
  ].filter(Boolean).join('\n');

  if (/(Foglalas|Foglalás|Sabee|IBE|OpenBE)/i.test(htmlToCheck)) {
    ok('SabeeApp / CTA marker found');
  } else {
    warn('SabeeApp CTA is not clearly detectable');
  }
}

await checkCriticalPages();
await checkRouteStability();
await checkAssets();
await checkAdminRoute();
await checkRoyalAliasRedirect();
checkBookingCta();

if (hasFailure) {
  console.error('[FAIL] Root deploy check failed');
  process.exit(1);
}

if (hasWarning) {
  console.warn('[WARN] Root deploy check finished with warnings');
}

console.log('[READY] Root deploy check passed');
