const instructorStatusTemplate = (status: "approved" | "denied", instructorName: string): string => {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Instructor Status Notification</title>
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
              <p>Dear ${instructorName},</p>
              <p>We are writing to inform you that your application to become an instructor has been ${status === "approved" ? "approved" : "denied"}.</p>
              ${status === "approved" ? `
              <p>Welcome aboard! We are excited to have you as part of our teaching community. You can now log in and start creating your courses.</p>
              ` : `
              <p>Unfortunately, after reviewing your application, we have decided not to approve it at this time. If you have any questions or would like feedback, feel free to contact us.</p>
              `}
              <p>Thank you for your interest in joining our platform.</p>
              <p>Best regards,<br>Team</p>
          </div>
          <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Our Platform. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>`;
  };
  
  export default instructorStatusTemplate;
  