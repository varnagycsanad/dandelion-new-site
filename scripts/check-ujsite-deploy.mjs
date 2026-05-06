const BASE_URL = 'https://dandelionhouse.hu';
const HOME_URL = `${BASE_URL}/`;

const criticalPages = [
  `${BASE_URL}/`,
  `${BASE_URL}/szallasok`,
  `${BASE_URL}/dandelion-d2`,
];

const adminUrl = `${BASE_URL}/_local/image-admin`;
const fetchHeaders = {
  'user-agent': 'dandelion-root-deploy-check/1.0',
};

let hasFailure = false;
let hasWarning = false;
let failureCount = 0;
const htmlByUrl = new Map();

function pathLabel(url) {
  return new URL(url).pathname;
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

async function fetchText(url) {
  const response = await fetch(url, {
    headers: fetchHeaders,
    redirect: 'follow',
  });
  const text = await response.text();
  return { response, text };
}

async function fetchStatus(url) {
  const response = await fetch(url, {
    headers: fetchHeaders,
    redirect: 'follow',
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
        ok(`${pathLabel(url)} 200`);
        htmlByUrl.set(url, text);
      } else {
        fail(`${pathLabel(url)} did not return 200: ${response.status}`);
      }
    } catch (error) {
      fail(`${pathLabel(url)} is not reachable: ${error.message}`);
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

  if (cssAssetUrls.length === 0) {
    fail('No Astro CSS asset found in root HTML');
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

function checkBookingCta() {
  const htmlToCheck = [
    htmlByUrl.get(HOME_URL),
    htmlByUrl.get(`${BASE_URL}/dandelion-d2`),
  ].filter(Boolean).join('\n');

  if (/(Foglalas|Foglalás|Sabee|IBE|OpenBE)/i.test(htmlToCheck)) {
    ok('SabeeApp / CTA marker found');
  } else {
    warn('SabeeApp CTA is not clearly detectable');
  }
}

await checkCriticalPages();
await checkAssets();
await checkAdminRoute();
checkBookingCta();

if (hasFailure) {
  console.error('[FAIL] Root deploy check failed');
  process.exit(1);
}

if (hasWarning) {
  console.warn('[WARN] Root deploy check finished with warnings');
}

console.log('[READY] Root deploy check passed');
