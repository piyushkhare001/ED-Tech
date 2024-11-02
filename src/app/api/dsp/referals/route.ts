import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/lib/mongodb";
import Referral from "@/models/Referal";
import { Coupon } from "@/models/Coupon";

export async function GET(req: NextRequest) {
  try {
    await connectToMongoDB();

    // Get coupon code from query parameters
    const searchParams = req.nextUrl.searchParams;
    const couponCode = searchParams.get("couponCode");

    if (!couponCode) {
      return NextResponse.json(
        { error: "Coupon code is required" },
        { status: 400 }
      );
    }

    // First find the coupon ID using the code
    const coupon = await Coupon.findOne({ code: couponCode });

    if (!coupon) {
      return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
    }

    // Find all referrals with this coupon
    const referrals = await Referral.find({ couponUsed: coupon._id })
      .populate("takenBy", "name email mobile") // Populate user details
      .populate("course", "title price") // Populate course details
      .populate("referedBy", "name email"); // Populate student partner details

    return NextResponse.json({
      message: "Referrals retrieved successfully",
      referrals,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
