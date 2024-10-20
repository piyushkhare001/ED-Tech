const paymentCompletedReceiptTemplate = (
  courseName: string,

  transactionId: string,
  date: string
): string => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Receipt - DESIZNIDEAZ</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Roboto:wght@300;400&display=swap');
        
        body {
          font-family: 'Roboto', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: #3498db;
          color: #ffffff;
          text-align: center;
          padding: 20px;
        }
        .logo {
          font-family: 'Poppins', sans-serif;
          font-size: 36px;
          margin: 0;
        }
        .content {
          padding: 30px;
        }
        .title {
          font-family: 'Poppins', sans-serif;
          font-size: 24px;
          color: #3498db;
          margin-bottom: 20px;
          text-align: center;
        }
        .receipt-info {
          background-color: #f0f8ff;
          border-radius: 5px;
          padding: 20px;
          margin-bottom: 20px;
        }
        .receipt-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .message {
          margin-bottom: 30px;
          text-align: center;
        }
        .footer {
          background-color: #f8f8f8;
          text-align: center;
          padding: 20px;
          font-size: 14px;
          color: #888;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="logo">DESIZNIDEAZ</h1>
        </div>
        <div class="content">
          <h2 class="title">Payment Receipt</h2>
          <p class="message">Thank you for your payment. Here's your receipt for the course enrollment:</p>
          <div class="receipt-info">
            <div class="receipt-row">
              <strong>Course:</strong>
              <span>${courseName}</span>
            </div>
           
            <div class="receipt-row">
              <strong>Transaction ID:</strong>
              <span>${transactionId}</span>
            </div>
            <div class="receipt-row">
              <strong>Date:</strong>
              <span>${date}</span>
            </div>
          </div>
          <p class="message">Your enrollment is now complete. You can access your course materials through your DESIZNIDEAZ dashboard.</p>
          <p style="text-align: center;">We hope you enjoy your learning journey with us!</p>
        </div>
        <div class="footer">
          <p>If you have any questions about this payment or your course, please contact our support team at <a href="mailto:support@desiznideaz.com">support@desiznideaz.com</a></p>
          <p>This receipt is for your records. Please keep it for future reference.</p>
        </div>
      </div>
    </body>
    </html>`;
};

export default paymentCompletedReceiptTemplate;
