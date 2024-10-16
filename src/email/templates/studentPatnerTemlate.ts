const studentPartnerStatusTemplate = (status: "approved" | "denied"): string => {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Student Partner Status Notification</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .header {
              background-color: ${status === "approved" ? "#4CAF50" : "#f44336"};
              color: white;
              text-align: center;
              padding: 10px 0;
              border-radius: 8px 8px 0 0;
          }
          .content {
              padding: 20px;
              text-align: center;
          }
          .footer {
              text-align: center;
              margin-top: 20px;
              font-size: 12px;
              color: #888;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>${status === "approved" ? "Congratulations!" : "Application Denied"}</h1>
          </div>
          <div class="content">
              <p>Dear Partner,</p>
              <p>We are pleased to inform you that your application to become a Student Partner has been ${status === "approved" ? "approved" : "denied"}.</p>
              ${status === "approved" ? `
              <p>Welcome to the Student Partner Program! We are excited to have you onboard. You can now access exclusive resources and opportunities to collaborate with other students.</p>
              ` : `
              <p>Unfortunately, after reviewing your application, we are unable to approve your application at this time. If you have any questions or need further clarification, please feel free to reach out to us.</p>
              `}
              <p>Thank you for your interest in the Student Partner Program.</p>
              <p>Best regards,<br>Team</p>
          </div>
          <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Our Platform. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>`;
  };
  
  export default studentPartnerStatusTemplate;
  