const fs = require('fs');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const results = [];

  const urls = [
    {
      name: 'Twitter Card Validator',
      url: 'https://cards-dev.twitter.com/validator',
      inputSelector: 'input[name="card_url"]',
      buttonSelector: 'button[type="submit"]',
      resultSelector: 'section',
      note: 'Twitter validator may require login and may not render reliably headlessly.',
    },
    {
      name: 'Facebook Sharing Debugger',
      url: 'https://developers.facebook.com/tools/debug/',
      inputSelector: 'input[placeholder*="URL"]',
      buttonSelector: 'button[type="submit"]',
      resultSelector: '#debug-content',
      note: 'Facebook debugger may need a login and may redirect. Grab screenshot if possible.',
    },
  ];

  for (const site of urls) {
    const result = { name: site.name, url: site.url, note: site.note, status: 'unknown' };
    try {
      await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(2000);
      result.status = 'loaded';
      const screenshotPath = `./public/${site.name.replace(/[^a-z0-9]+/gi, '_').toLowerCase()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      result.screenshot = screenshotPath;
    } catch (error) {
      result.status = 'error';
      result.error = String(error);
    }
    results.push(result);
  }

  // capture head/meta tags screenshot from live site
  try {
    const headPage = await browser.newPage();
    await headPage.goto('https://www.sharetextqr.com', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await headPage.waitForTimeout(2000);
    const headData = await headPage.evaluate(() => {
      const tags = Array.from(document.head.querySelectorAll('link[rel~="icon"],meta[property^="og:"],meta[name^="twitter:"]'));
      return tags.map(t => t.outerHTML).join('\n');
    });
    fs.writeFileSync('./public/head-meta.html', `<pre>${headData.replace(/</g, '&lt;')}</pre>`);
    await headPage.screenshot({ path: './public/head-screenshot.png', fullPage: true });
    results.push({ name: 'Homepage Head', status: 'captured', screenshot: './public/head-screenshot.png', html: './public/head-meta.html' });
  } catch (error) {
    results.push({ name: 'Homepage Head', status: 'error', error: String(error) });
  }

  await browser.close();
  fs.writeFileSync('./public/validator-check-results.json', JSON.stringify(results, null, 2));
  console.log('Done', results);
})();