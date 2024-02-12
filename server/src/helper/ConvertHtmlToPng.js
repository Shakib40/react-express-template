const puppeteer = require("puppeteer");

async function convertHtmlToPdf(htmlContent, outputPath) {
  try {
    // const browser = await puppeteer.launch();
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setContent(htmlContent);

    // Check if outputPath is provided
    if (outputPath) {
      // If outputPath is provided, generate a PDF file
      await page.pdf({ path: outputPath, format: "A4" });
      await browser.close();
    } else {
      // If outputPath is not provided, return the PDF buffer
      const pdfBuffer = await page.pdf({ format: "A4" });
      await browser.close();

      if (!pdfBuffer || pdfBuffer.length === 0) {
        throw new Error("PDF buffer is undefined or empty.");
      }

      return pdfBuffer;
    }
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
}

module.exports = convertHtmlToPdf;