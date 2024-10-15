import dbConnect from "../../../../lib/mognodb";
import User from "../../../../models/User";
import OTP from "../../../../models/Otp";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import mailSender from "@/lib/utility/mailSender";

export async function POST(req: Request) {
  try {
    const { email, name, password, role, mobile, otp } = await req.json();
    console.log(email, name, password, role, mobile, otp);

    if (!email || !name || !password || !role || !otp || !mobile) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        { status: 400 }
      );
    }

    await dbConnect();

    // Fetch the most recent OTP for the email
    const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 });
    if (!recentOtp) {
      return NextResponse.json(
        {
          success: false,
          message: "OTP not found. Please request a new OTP.",
        },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already registered.",
        },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });


    await mailSender({
      email: email, // recipient's email
      title: `Welcome to DesiznIdeaz, ${name}`, // subject
      body: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sign Up Successful - DesiznIdeaz</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 100%;
            padding: 20px;
            background-color: #ffffff;
            max-width: 600px;
            margin: 0 auto;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #333333;
            padding: 20px;
            text-align: center;
            color: #ffffff;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            text-transform: uppercase;
          }
          .content {
            padding: 20px;
            text-align: center;
          }
          .content h2 {
            font-size: 22px;
            color: #333333;
          }
          .content p {
            font-size: 16px;
            color: #555555;
            line-height: 1.6;
          }
          .button {
            margin-top: 20px;
            display: inline-block;
            background-color: #ff6600;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
          }
          .footer {
            margin-top: 20px;
            padding: 20px;
            font-size: 14px;
            color: #777777;
            text-align: center;
            background-color: #f4f4f4;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
          }
          .footer p {
            margin: 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <div class="header">
            <h1>Welcome to DesiznIdeaz</h1>
          </div>
  
          <!-- Content -->
          <div class="content">
            <h2>Hi ${name},</h2>
           <p> your account has been created as ${role} </p>
            <p>We're excited to have you on board! If you have any questions or need assistance, feel free to contact our support team at any time.</p>
  
            <!-- Call to Action Button -->
            <a href="#" class="button">Explore Now</a>
          </div>
  
          <!-- Footer -->
          <div class="footer">
            <p>Thank you for choosing DesiznIdeaz!</p>
            <p>&copy; 2024 DesiznIdeaz. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `  , // call to generate HTML string
    });



   
    return NextResponse.json(
      {
        user: newUser,
        success: true,
        message: "User registered successfully.",
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Error verifying OTP:", error);

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
        message: "An error occurred while verifying the OTP. Please try again later.",
      },
      { status: 500 }
    );
  }
}
