const passwordResetTemplate = (resetLink: string): string => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your DESIZNIDEAZ Password</title>
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
          text-align: center;
        }
        .title {
          font-family: 'Poppins', sans-serif;
          font-size: 24px;
          color: #3498db;
          margin-bottom: 20px;
        }
        .reset-button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #3498db;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          margin: 20px 0;
        }
        .message {
          margin-bottom: 30px;
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
          <h2 class="title">Reset Your Password</h2>
          <p class="message">We received a request to reset your password for your DESIZNIDEAZ account. If you didn't make this request, you can safely ignore this email.</p>
          <p>Click this link to reset your password: ${resetLink}</p>
          <a href="${resetLink}" class="reset-button">Reset Password</a>
          <p class="message">This link will expire in 1 hour for security reasons. If you need to reset your password after that, please request a new reset link.</p>
          <p>If you're having trouble clicking the button, copy and paste the URL below into your web browser:</p>
          <p>${resetLink}</p>
        </div>
        <div class="footer">
          <p>If you need further assistance, please contact our support team at <a href="mailto:support@desiznideaz.com">support@desiznideaz.com</a></p>
        </div>
      </div>
    </body>
    </html>`;
  };
  
  export default passwordResetTemplate;