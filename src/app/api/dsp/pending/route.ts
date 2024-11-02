import connectToMongoDB from "@/lib/mongodb";
import StudentPartner from "@/models/StudentPartner";
import { QNA } from "@/models/QNA";

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // const { adminId } = await req.json();
    // console.log(adminId);
    // if (!adminId) {
    //   return NextResponse.json(
    //     { success: false, message: "Admin Permission is required" },
    //     { status: 400 }
    //   );
    // }
    await connectToMongoDB();
    const studentPartners = await StudentPartner.find({
      adminApproval: "Pending",
    })
      .populate("coupon")
      .exec();

    const data = await Promise.all(
      studentPartners.map(async (partner) => {
        console.log(partner);
        const qna = await QNA.findOne({ studentPartnerId: partner._id });
        return {
          name: partner.name,
          email: partner.email,
          collegeName: partner.collegeName,
          contactNumber: partner.contactNumber,
          educationQualification: partner.educationQualification,
          branch: partner.branch,
          yearOrsemester: partner.yearOrsemester,
          adminApproval: partner.adminApproval,
          coupon: partner.coupon,
          qna: qna?.sections,
        };
      })
    );

    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching student partner details:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
