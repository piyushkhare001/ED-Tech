import nodemailer from "nodemailer";

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

const mailSender = async (
  email: string,
  subject: string,
  emailTemplate: string
): Promise<nodemailer.SentMessageInfo> => {
  try {
    // If you are using real SMTP credentials, remove the testAccount logic
    // const testAccount = await nodemailer.createTestAccount();

    // Create a transporter using actual credentials from the environment
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, // Real SMTP host (e.g., smtp.gmail.com)
      port: parseInt(process.env.MAIL_PORT || "587", 10), // Default to 587 if not set
      secure: parseInt(process.env.MAIL_PORT || "587", 10) === 465, // Secure true for port 465 (SSL)
      auth: {
        user: process.env.MAIL_USER, // Your actual email user (not testAccount)
        pass: process.env.MAIL_PASS, // Your actual email password (not testAccount)
      },
    });

    const mailOptions: MailOptions = {
      from: `"DesiznIdeaz" <${process.env.MAIL_USER}>`,
      to: email,
      subject: subject,
      html: emailTemplate,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("OTP email sent: ", info.messageId);
    return info;
  } catch (error) {
    console.error(
      "Error occurred while sending email:",
      (error as Error).message
    );
    throw new Error("Failed to send email. Please try again later.");
  }
};

export default mailSender;





// import nodemailer from "nodemailer";

// interface MailOptions {
//   from: string;
//   to: string;
//   subject: string;
//   html: string;
// }

// const mailSender = async (
//   email: string,
//   subject: string,
//   emailTemplate: string
// ): Promise<nodemailer.SentMessageInfo> => {
//   try {
//     const testAccount = await nodemailer.createTestAccount();

//     // Create a transporter using Nodemailer
//     const transporter = nodemailer.createTransport({
//       host: process.env.MAIL_HOST,
//       port: parseInt(process.env.MAIL_PORT || "587", 10),
//       secure: process.env.MAIL_PASS === "true",
//       auth: {
//         user: testAccount.user,
//         pass: testAccount.pass,
//       },
//     });

//     const mailOptions: MailOptions = {
//       from: `"DesiznIdeaz" <${process.env.MAIL_USER}>`,
//       to: email,
//       subject: subject,
//       html: emailTemplate,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log("OTP email sent: ", info.messageId);
//     return info;
//   } catch (error) {
//     console.error(
//       "Error occurred while sending email:",
//       (error as Error).message
//     );
//     throw new Error("Failed to send email. Please try again later.");
//   }
// };

// export default mailSender;
