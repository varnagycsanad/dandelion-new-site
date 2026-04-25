const BASE_URL = 'https://dandelionhouse.hu';
const HOME_URL = `${BASE_URL}/ujsite/`;

const criticalPages = [
  `${BASE_URL}/ujsite/`,
  `${BASE_URL}/ujsite/szallasok`,
  `${BASE_URL}/ujsite/dandelion-d2`,
];

const adminUrl = `${BASE_URL}/ujsite/_local/image-admin`;
const fetchHeaders = {
  'user-agent': 'dandelion-ujsite-deploy-check/1.0',
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

    if (assetUrl.origin === BASE_URL && assetUrl.pathname.startsWith('/ujsite/')) {
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
        fail(`${pathLabel(url)} nem 200-as választ adott: ${response.status}`);
      }
    } catch (error) {
      fail(`${pathLabel(url)} nem érhető el: ${error.message}`);
    }
  }
}

async function checkAssetStatuses(assetUrls, assetType) {
  for (const url of assetUrls) {
    try {
      const response = await fetchStatus(url);

      if (response.status !== 200) {
        fail(`${assetType} asset nem 200-as választ adott: ${url} (${response.status})`);
      }
    } catch (error) {
      fail(`${assetType} asset nem érhető el: ${url} (${error.message})`);
    }
  }
}

async function checkAssets() {
  const homeHtml = htmlByUrl.get(HOME_URL);

  if (!homeHtml) {
    fail('/ujsite/ HTML nem áll rendelkezésre az asset ellenőrzéshez');
    return;
  }

  if (/(?:href|src)=["']\/_astro\//i.test(homeHtml)) {
    fail('Rossz root asset hivatkozás található az /ujsite/ HTML-ben');
  } else {
    ok('Base path asset hivatkozások rendben');
  }

  const cssAssetUrls = findAssetUrls(homeHtml, 'href', 'css');

  if (cssAssetUrls.length === 0) {
    fail('Nem található Astro CSS asset az /ujsite/ HTML-ben');
  } else {
    const failureCountBeforeCss = failureCount;
    await checkAssetStatuses(cssAssetUrls, 'CSS');

    if (failureCount === failureCountBeforeCss) {
      ok('CSS assetek betöltődnek');
    }
  }

  const jsAssetUrls = findAssetUrls(homeHtml, 'src', 'js');

  if (jsAssetUrls.length === 0) {
    ok('Astro JS asset nincs, ez rendben van');
  } else {
    const failureCountBeforeJs = failureCount;
    await checkAssetStatuses(jsAssetUrls, 'JS');

    if (failureCount === failureCountBeforeJs) {
      ok('JS assetek betöltődnek');
    }
  }
}

async function checkAdminRoute() {
  try {
    const response = await fetchStatus(adminUrl);

    if (response.status === 200) {
      fail('_local admin route publikusan 200-zal elérhető');
    } else {
      ok('_local admin route nincs publikusan elérve');
    }
  } catch (error) {
    ok(`_local admin route nem érhető el (${error.message})`);
  }
}

function checkBookingCta() {
  const htmlToCheck = [
    htmlByUrl.get(HOME_URL),
    htmlByUrl.get(`${BASE_URL}/ujsite/dandelion-d2`),
  ].filter(Boolean).join('\n');

  if (/(Foglalás|Sabee|IBE|OpenBE)/i.test(htmlToCheck)) {
    ok('SabeeApp / CTA jelzés található');
  } else {
    warn('SabeeApp CTA nem egyértelműen található');
  }
}

await checkCriticalPages();
await checkAssets();
await checkAdminRoute();
checkBookingCta();

if (hasFailure) {
  console.error('[FAIL] Ujsite deploy ellenőrzés sikertelen');
  process.exit(1);
}

if (hasWarning) {
  console.warn('[WARN] Ujsite deploy ellenőrzés warninggal futott le');
}

console.log('[READY] Ujsite deploy ellenőrzés sikeres');
