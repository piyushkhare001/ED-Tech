// pages/api/download.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), 'assets', 'certificate.html'); // Adjust the path as needed
  const fileName = 'certificate.html'; // Set the file name for download

  // Check if the file exists
  fs.stat(filePath, (err, stats) => {
    if (err) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Set headers to trigger download
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', stats.size);

    // Pipe the file stream to the response
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  });
}
