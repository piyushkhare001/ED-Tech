import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/lib/mongodb";
import Referral from "@/models/Referal";
import StudentPartner from "@/models/StudentPartner";
import { Coupon } from "@/models/Coupon";

export async function POST(req: NextRequest) {
  try {
    connectToMongoDB();
    const body = await req.json();
    const { takenBy, couponUsed, referedBy, course } = body;

    const newReferral = await Referral.create({
      takenBy,
      couponUsed,
      referedBy,
      course,
      paymentStatus: "Pending",
    });

    return NextResponse.json(
      {
        message: "Referral created successfully",
        referral: newReferral,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectToMongoDB();
    const body = await req.json();
    const { couponUsed, courseId } = body;

    // Find the referral
    const referral = await Referral.findOne({
      couponUsed,
      course: courseId,
    });

    if (!referral) {
      return NextResponse.json(
        { error: "Referral not found" },
        { status: 404 }
      );
    }

    // Find the coupon to get commission details
    const coupon = await Coupon.findById(couponUsed);
    if (!coupon) {
      return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
    }

    // Find the student partner
    const studentPartner = await StudentPartner.findById(referral.referedBy);
    if (!studentPartner) {
      return NextResponse.json(
        { error: "Student partner not found" },
        { status: 404 }
      );
    }

    // Update referral payment status
    referral.paymentStatus = "Completed";
    await referral.save();

    // Update student partner's total balance
    studentPartner.totBalance += coupon.associatetCommission;
    await studentPartner.save();

    return NextResponse.json({
      message: "Payment status updated and commission added",
      referral,
      studentPartner,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
