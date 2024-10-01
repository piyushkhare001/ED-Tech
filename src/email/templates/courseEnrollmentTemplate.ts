const enrollCourseConfirmationTemplate = (
  courseName: string,
  startDate: string
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
        <div class="header">
          <h1 class="logo">DESIZNIDEAZ</h1>
        </div>
        <div class="content">
          <h2 class="title">Course Enrollment Confirmation</h2>
          <p class="message">Congratulations! You have successfully enrolled in the following course:</p>
          <div class="course-info">
            <h3>${courseName}</h3>
            <p>Start Date: ${startDate}</p>
          </div>
          <p class="message">We're excited to have you join us on this learning journey. Your course materials will be available on your dashboard starting from the course start date.</p>
          <p>Here are a few things to keep in mind:</p>
          <ul style="text-align: left;">
            <li>Make sure you have all the necessary equipment and software for the course.</li>
            <li>Familiarize yourself with our learning platform before the course starts.</li>
            <li>Don't hesitate to reach out to our support team if you have any questions.</li>
          </ul>
          <p>We look forward to seeing you in class!</p>
        </div>
        <div class="footer">
          <p>If you need any assistance, please contact our support team at <a href="mailto:support@desiznideaz.com">support@desiznideaz.com</a></p>
          <p>Remember, upon successful completion, you'll receive an AICTE-approved certificate for this course.</p>
        </div>
      </div>
    </body>
    </html>`;
};

export default enrollCourseConfirmationTemplate;
