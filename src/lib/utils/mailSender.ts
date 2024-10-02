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
    const testAccount = await nodemailer.createTestAccount();

    // Create a transporter using Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || "587", 10),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const mailOptions: MailOptions = {
      from: `"Vogueish" <${process.env.EMAIL_USER}>`,
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
