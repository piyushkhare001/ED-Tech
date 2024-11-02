import connectToMongoDB from "@/lib/mongodb";
import StudentPartner from "@/models/StudentPartner";
import { Coupon } from "@/models/Coupon";
import { NextResponse } from "next/server";
export async function PUT(req: Request) {
  try {
    const { studentPartnerId, status, associatedPrice, associatedCommission } =
      await req.json();

    if (!studentPartnerId || !status) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }

    await connectToMongoDB();

    const studentPartner = await StudentPartner.findById(studentPartnerId);
    if (!studentPartner) {
      return NextResponse.json(
        { success: false, message: "Student partner not found" },
        { status: 404 }
      );
    }

    // Update student partner status
    studentPartner.adminApproval = status;
    await studentPartner.save();

    // If approved, update coupon details
    if (status === "Approved" && studentPartner.coupon) {
      await Coupon.findByIdAndUpdate(studentPartner.coupon, {
        associatedPrice,
        associatetCommission: associatedCommission,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: `Student partner ${status.toLowerCase()} successfully`,
        data: studentPartner,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in student partner approval:", error);
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
