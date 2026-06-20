const { chromium } = require('playwright');

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-72627F4HHG';
const URL = process.env.TEST_URL || 'http://127.0.0.1:3000';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const requests = [];
  page.on('request', (request) => {
    const url = request.url();
    if (
      /googletagmanager\.com/.test(url) ||
      /gtag\/js/.test(url) ||
      url.includes(GA_ID) ||
      /collect\?v=2/.test(url)
    ) {
      requests.push({ url, method: request.method(), resourceType: request.resourceType() });
    }
  });

  try {
    const response = await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
    if (!response || !response.ok()) {
      console.error(`Failed to load ${URL}: ${response ? response.status() : 'no response'}`);
      process.exit(1);
    }

    await page.waitForTimeout(2000);

    const dataLayerExists = await page.evaluate(() => typeof window.dataLayer !== 'undefined');
    const gtagExists = await page.evaluate(() => typeof window.gtag !== 'undefined');

    console.log(`URL loaded: ${URL}`);
    console.log(`dataLayer defined: ${dataLayerExists}`);
    console.log(`gtag defined: ${gtagExists}`);

    if (requests.length === 0) {
      console.error('No Google Analytics requests were detected.');
      await browser.close();
      process.exit(1);
    }

    console.log(`Detected ${requests.length} GA-related requests:`);
    requests.forEach((request) => {
      console.log(`- ${request.method} ${request.url} [${request.resourceType}]`);
    });

    await browser.close();
    process.exit(0);
  } catch (error) {
    console.error('Error during GA validation:', error);
    await browser.close();
    process.exit(1);
  }
})();
