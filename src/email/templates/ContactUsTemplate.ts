const contactUsTemplate = (name: string): string => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Contacting Us</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              color: #333;
              padding: 20px;
              line-height: 1.6;
          }
          .container {
              background: white;
              padding: 20px;
              border-radius: 5px;
              box-shadow: 0 2px 5px rgba(0,0,0,0.1);
              max-width: 600px;
              margin: auto;
          }
          h1 {
              color: #007BFF;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>Thank You, ${name}!</h1>
          <p>Thank you for contacting DesignIdeaz. We appreciate your message and will get back to you soon.</p>
          <p>If you have any urgent questions, feel free to reach us at <a href="mailto:info@designideaz.com">info@designideaz.com</a>.</p>
          <p>Best regards,<br>The DesignIdeaz Team</p>
      </div>
  </body>
  </html>`;
};
export default contactUsTemplate
