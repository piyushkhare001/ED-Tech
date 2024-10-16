// Import required types and modules
// import { NextRequest, NextResponse } from 'next/server';
// import fs from 'fs';
// import path from 'path';

// export async function GET(req: NextRequest) {
//   const filePath = path.join(process.cwd(), 'src', 'assets', 'cerificate.html');

//   try {
//     // Read the HTML file content
//     const certificateHtml = fs.readFileSync(filePath, 'utf-8');

//     // Return the HTML content in the response
//     return NextResponse.json({ certificateHtml }, { status: 200 });
//   } catch (error) {
//     // Handle errors (e.g., file not found)
//     return NextResponse.json({ message: 'Error reading certificate HTML file', error: String(error) }, { status: 500 });
//   }
// }

// src/app/api/generate-pdf/route.tsimport fs from 'fs';
import fs from 'fs'
import path from 'path';
import puppeteer from 'puppeteer';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src/assets/cerificate.html');
    let certificateHtml = fs.readFileSync(filePath, 'utf-8');
    certificateHtml = certificateHtml.replace(/ASHISH BARBARIA/g, 'YAHYA SAAD');
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-infobars',  // Disable infobars (the message that tells you Chrome is being controlled)
        '--window-size=1920x1080',  // Set a default window size
        '--disable-gpu',  // Disable GPU hardware acceleration
      ],
    });

    const page = await browser.newPage();
    await page.setContent(certificateHtml, {
      waitUntil: 'networkidle0',
    });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      landscape: true,
      printBackground: true,
    });

    await browser.close();

    // Return a Response object with the PDF data
    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=certificate.pdf',
      },
    });
  } catch (error) {
    console.error('Error during PDF generation:', error);
    // Return a 500 status response with the error message
    return new Response(JSON.stringify({ error: 'Failed to generate PDF' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
