const ContactUsTemplate = (
  email :string, name :string, message :string, mobileNo: number, accountType :string
): string => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Course Enrollment Confirmation - DESIZNIDEAZ</title>
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
        .course-info {
          background-color: #f0f8ff;
          border-radius: 5px;
          padding: 20px;
          margin-bottom: 20px;
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
      ${name}
       ${message}
        ${mobileNo}
         ${accountType}
          ${email}

      </div>
    </body>
    </html>`
};

export default ContactUsTemplate;