const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const puppeteer = require('puppeteer');

const puppeteerOptions = {
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  headless: true,
  defaultViewport: {
    width: 1920, // Adjust the width to capture full content
    height: 1080, // Adjust the height to capture full content
  },
};

exports.DOWNLOAD_PDF = async (request, response, next) => {
  try {
    const reportHtmlPath = path.join(__dirname, '..', 'assets', 'img.html');
    const reportTemplate = fs.readFileSync(reportHtmlPath, 'utf8');
    const htmlContent = ejs.render(reportTemplate);

    // Launch Puppeteer browser
    const browser = await puppeteer.launch(puppeteerOptions);
    const page = await browser.newPage();
    
    // Set content of the page
    await page.setContent(htmlContent);

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4'
    });

    // Close the browser
    await browser.close();

    // Set appropriate headers for PDF response
    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader('Content-Disposition', 'attachment; filename="output.pdf"');

    // Send the generated PDF buffer in the response
    response.send(pdfBuffer);
  } catch (error) {
    next(error);
  }
};

exports.DOWNLOAD_PNG = async (request, response, next) => {
  try {
    const reportHtmlPath = path.join(__dirname, '..', 'assets', 'img.html');
    const reportTemplate = fs.readFileSync(reportHtmlPath, 'utf8');
    const htmlContent = ejs.render(reportTemplate);

    const browser = await puppeteer.launch(puppeteerOptions);
    const page = await browser.newPage();

    // Set content of the page
    await page.setContent(htmlContent);

    // Scroll to the bottom of the page to capture entire content
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    // Generate PNG screenshot
    const screenshotBuffer = await page.screenshot({ type: 'png' });

    // Close the browser
    await browser.close();

    // Set appropriate headers for image response
    response.setHeader('Content-Type', 'image/png');
    response.setHeader('Content-Disposition', 'attachment; filename="output.png"');

    // Send the generated PNG buffer in the response
    response.send(screenshotBuffer);
  } catch (error) {
    next(error);
  }
};