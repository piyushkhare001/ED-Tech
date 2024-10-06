import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/mognodb";
import User from "../../../../../models/User";
import otpGenerator from "otp-generator";
import OTP from "../../../../../models/Otp";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Validate email input
    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required.",
        },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if the user is already registered
    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      return NextResponse.json(
        {
          success: false,
          message: "User already registered.",
        },
        { status: 409 }
      );
    }

    // Generate a unique 6-digit OTP
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // Ensure OTP uniqueness
    let existingOTP = await OTP.findOne({ otp });
    while (existingOTP) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      existingOTP = await OTP.findOne({ otp });
    }

    // Store OTP in the database
    const otpPayload = { email, otp };
    await OTP.create(otpPayload);

    console.log("OTP generated and stored:", otpPayload);
    return NextResponse.json(
      {
        success: true,
        message: "OTP sent successfully.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error sending OTP:", error);

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
          "An error occurred while sending the OTP. Please try again later.",
      },
      { status: 500 }
    );
  }
}