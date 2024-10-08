
//import ContactUsTemplate from "../../../email/templates/ContactUsTemplate";
//import mailSender from "../../../lib/utility/mailSender";
import connectToDatabase from "../../../lib/mognodb";
import ContactUsSchema from "../../../models/ContactUs";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { name, email, message, mobileNo, accountType } = await req.json();
  
    if (!name || !email || !message || !mobileNo || !accountType) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

  //  const supportEmail: string = process.env.SupportTeam || "piyushkhare671@gmail.com";
         
    console.log("mongodb url", process.env.MONGODB_URL)
    try {
        await connectToDatabase();
        const newRequest = new ContactUsSchema({ name, email, message, accountType, mobileNo });
        await newRequest.save();

        // const mailSentToSupport = await mailSender(
        //     supportEmail,
        //     "Contact Us Request",
        //     ContactUsTemplate(email, name, message, mobileNo, accountType)
        // );

        // if (mailSentToSupport) {
        //     const emailRes = await mailSender(
        //         email,
        //         "Your request was sent successfully",
        //         ContactUsTemplate(email, name, message, mobileNo, accountType)
        //     );
          //  console.log("Email Response: ", emailRes);
            return NextResponse.json({
                success: true,
                message: "Email sent successfully",
            });
        // } else {
        //     return NextResponse.json({
        //         success: false,
        //         message: "Email not received by support team",
        //     });
      //  }
    } catch (error: any) {
        console.log("Error: ", error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong...",
        });
    }
}
