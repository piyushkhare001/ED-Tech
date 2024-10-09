import dbConnect from "../../../../lib/mognodb";
import StudentPartner from "@/models/StudentPartner";
import { NextResponse } from "next/server";
import otpGenerator from "otp-generator";
import { Coupon } from "@/models/Coupon";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request data",
        },
        { status: 400 }
      );
    }
    await dbConnect();

    //Check if the student is already a student partner
    const existingPartner = await StudentPartner.findOne({ email });
    if (existingPartner) {
      return NextResponse.json(
        {
          success: false,
          message: "User already registered.",
          status: existingPartner.adminApproval,
        },
        { status: 409 }
      );
    }
    // Generate a unique 10-digit coupon for the partner
    let coupon = otpGenerator.generate(6, {
      upperCaseAlphabets: true,
    });

    // Ensure OTP uniqueness
    let existingCoupon = await Coupon.findOne({ code: coupon });
    while (existingCoupon) {
      coupon = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      existingCoupon = await Coupon.findOne({ code: coupon });
    }
    // Create the new user
    const newPartner = await StudentPartner.create({
      email,
      adminApproval: false,
      couponCode: coupon,
    });

    return NextResponse.json(
      {
        partner: newPartner,
        success: true,
        message: "Student Partner registered successfully.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error registering Student Partner:", error);
    if (error.name === "ValidationError") {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error. Please check your input.",
        },
        { status: 400 }
      );
    } else if (error.name === "MongoError" || error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "Database error. Please try again later.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message:
          "An error occurred while registering Student Partner. Please try again later.",
      },
      { status: 500 }
    );
  }
}
