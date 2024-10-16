
import dbConnect from "../../../../lib/mognodb";
import StudentPartner from "@/models/StudentPartner";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"; // To get session
import { authOptions } from "../../../../lib/auth";
import mailSender from "@/lib/utility/mailSender";
import studentPartnerStatusTemplate from "@/email/templates/studentPatnerTemlate";



export async function POST(req: Request) {
  try {

    const session = await getServerSession(authOptions);


    if (!session || session.user.role !== "admin") {
        return NextResponse.json(
          { message: "Unauthorized access" },
          { status: 403 }
        ); 
      }

    const { email, adminApproval } = await req.json();

   
    if (!email || !adminApproval || !["Approved", "Rejected"].includes(adminApproval)) {
      return NextResponse.json(
        { success: false, message: "Invalid request data" },
        { status: 400 }
      );
    }

    await dbConnect();

    const partnerApplication = await StudentPartner.findOne(email);
    if (!partnerApplication) {
      return NextResponse.json(
        { success: false, message: "Student partner application not found" },
        { status: 404 }
      );
    }


    partnerApplication.adminApproval = adminApproval;
    
    await mailSender({
      email:partnerApplication.email,
      title:'Student Patner Request',
      body: studentPartnerStatusTemplate(adminApproval=='Approved'?'approved':'denied')
    })
    
    await partnerApplication.save();

    return NextResponse.json(
      { success: true, message: `Student partner application ${adminApproval}` },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error approving or rejecting student partner application:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update application" },
      { status: 500 }
    );
  }
}
