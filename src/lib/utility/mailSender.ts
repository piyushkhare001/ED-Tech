import nodemailer from "nodemailer";

interface MailOptions {
  email: string;
  title: string;
  body: any;
}

const mailSender = async ({ email, title, body }: MailOptions): Promise<any> => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      secure: false,
    });

    let info = await transporter.sendMail({
      from: `<${process.env.MAIL_USER}>`, // sender address
      to: email, // list of receivers
      subject: title, // Subject line
      html: body, // html body
    });

    console.log(info.response);
    return {info,sent:false};
  } catch (error: any) {
    console.log(error.message);
    return {message:error.message,sent:false};
  }
};

export default mailSender;
