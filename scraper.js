const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

(async () => {

    const browser = await puppeteer.launch({ 
        headless: false, 
        slowMo: 75,
        defaultViewport: null
    });

    const page = await browser.newPage();

    // open up the link
    await page.goto('https://app-dev.condoworks.co');
    console.log("page has been opened");

    // login
    await page.type('#Email', 'coop.test@condoworks.co');
    await page.type('#Password', 'TheTest139');
    await page.click('input[type="submit"]');
    console.log("you've been signed in");

    // Navigate to invoices then all
    await page.waitForSelector('.navbar', { timeout: 15000 });
    const toggler = await page.$('.navbar-toggler');
    if (toggler) { //for hamburger menu
      const isVisible = await toggler.isIntersectingViewport();
      if (isVisible) {
        await toggler.click();
        // wait for the collapse to show
        await page.waitForSelector('.navbar-collapse.show', { timeout: 5000 }).catch(() => {});
      }
    }

    await page.click('a.nav-link.dropdown-toggle');
    await page.click('div.dropdown-menu.show a.dropdown-item[href="/invoices/all"]');
    console.log("navigating to all invoices")

    // search
   await page.waitForSelector('th[aria-label^="Invoice #"] input.inputFilter', { timeout: 15000 });
   const invoiceInput = await page.$('th[aria-label^="Invoice #"] input.inputFilter');
   await invoiceInput.type('123');
   console.log('searched 123');
 
    // click on invoice 
  await page.waitForSelector('#grid tbody tr');

  // Click the magnifying glass button in the row where Invoice # is 123444
  await page.evaluate(() => {
  const rows = Array.from(document.querySelectorAll('#grid tbody tr'));
  const targetRow = rows.find(r =>
    r.querySelector('td[target-name="invoices.InvoiceNumber"]')?.innerText.trim() === '123444'
  );
  targetRow?.querySelector('td[target-name="edit"] a.btn')?.click();
  });
  console.log("magnifying glass button clicked");

  // downloading file
   await page.waitForSelector('a.kv-file-download', { timeout: 15000 });
   const pdfUrl = await page.$eval('a.kv-file-download', a => a.href);

    const pdfPage = await browser.newPage();
    const response = await pdfPage.goto(pdfUrl);
    const buffer = await response.buffer();
    console.log("file downloaded");

    // output file path
    const filePath = path.resolve(__dirname, 'invoice-123444.pdf'); // file saved in directory where scraper.js located
    fs.writeFileSync(filePath, buffer);
    console.log('Saved file:', filePath);

    await browser.close();
    
})();
