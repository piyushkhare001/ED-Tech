import ContactUsTemplate from "../../../email/templates/ContactUsTemplate";
import contactNotificationTemplate from "../../../email/templates/contactNotificationTemplate";
import mailSender from "../../../lib/utility/mailSender";
import connectToDatabase from "../../../lib/mognodb";
import { NextRequest, NextResponse } from "next/server";
import ContactUsModel from "../../../models/ContactUs";

export async function POST(req: NextRequest) {
  const { name, email, message, mobileNo, accountType } = await req.json();

  if (!name || !email || !message || !mobileNo || !accountType) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const supportEmail: string =
    process.env.SupportTeam || "yahyasaads.magic@gmail.com";

  try {
    await connectToDatabase();
    const newRequest = await ContactUsModel.create({
      name,
      email,
      message,
      accountType,
      mobileNo,
    })

    const mailSentToSupport = await mailSender({
      email: email,
      title: "Contact Us Request ",
      body: ContactUsTemplate(name),
    });
    const mailSentToSupportTeam = await mailSender({
      email: supportEmail,
      title: `Contact Request from ${name}`,
      body: contactNotificationTemplate( name, email, mobileNo , accountType, message),
    });
    if (mailSentToSupport.sent && mailSentToSupportTeam.sent) {
      return NextResponse.json({
        success: true,
        message: "Email sent successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Email not received by support team",
      },{status:400});
    }
  } catch (error: any) {
    console.log("Error: ", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong...",
    },{status:500});
  }
}
