// import { useEffect, useState } from 'react';
// import { jsPDF } from 'jspdf';
// import html2canvas from 'html2canvas';

// const CertificateDownloader = () => {
//   const [certificateHtml, setCertificateHtml] = useState<string>('');

//   // Fetch the HTML content from the API
//   useEffect(() => {
//     fetch('/api/certificate')
//       .then((response) => response.json())
//       .then((data) => {
//         setCertificateHtml(data.certificateHtml);
//       })
//       .catch((error) => console.error('Error loading HTML content:', error));
//   }, []);

//   const downloadPdf = async () => {
//     if (!certificateHtml) {
//       alert('Certificate is still loading');
//       return;
//     }

//     // Replace the desired text (ASHISH BARBARIA with YAHYA SAAD)
//     let modifiedHtml = certificateHtml.replace(/ASHISH BARBARIA/g, 'YAHYA SAAD');

//     // Create a temporary div to render the modified HTML
//     const tempDiv = document.createElement('div');
//     tempDiv.innerHTML = modifiedHtml;
//     tempDiv.style.display = 'block';
//     document.body.appendChild(tempDiv);

//     try {
//       // Use html2canvas to capture the div as an image
//       const canvas = await html2canvas(tempDiv, {
//         scale: 2, // Higher scale for better image quality
//         useCORS: true, // Handle CORS for external fonts/images
//       });
//       console.log(canvas);
      
//       // Convert the canvas to a base64 image
//       const imgData = canvas.toDataURL('image/png');

//       // Debugging step: Check if imgData is valid
//       if (!imgData.startsWith('data:image/png')) {
//         throw new Error('Invalid image data');
//       }

//       // Initialize jsPDF with landscape orientation
//       const pdf = new jsPDF('landscape', 'pt', 'a4');

//       // Calculate dimensions
//       const imgWidth = pdf.internal.pageSize.getWidth();
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;

//       // Add the image to the PDF
//       pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

//       // Save the generated PDF
//       pdf.save('certificate.pdf');

//     } catch (error) {
//       console.error('Error during PDF generation:', error);
//       alert('Error occurred while generating the PDF. Please try again.');
//     } finally {
//       // Clean up the temporary div
//       document.body.removeChild(tempDiv);
//     }
//   };

//   return (
//     <div>
//       {/* Render the certificate HTML for debugging */}
//       <div dangerouslySetInnerHTML={{ __html: certificateHtml }} />

//       {/* Button to download the certificate as PDF */}
//       <button onClick={downloadPdf}>Download Certificate as PDF</button>
//     </div>
//   );
// };

// export default CertificateDownloader;
import { useState } from 'react';

const CertificateDownloader = () => {
  const [isLoading, setIsLoading] = useState(false);

  const downloadPdf = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/certificate');
      if (!response.ok) {
        throw new Error('Error generating PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'certificate.pdf');

      // Append the link to the document and trigger the download
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={downloadPdf} disabled={isLoading}>
        {isLoading ? 'Generating PDF...' : 'Download Certificate as PDF'}
      </button>
    </div>
  );
};

export default CertificateDownloader;
