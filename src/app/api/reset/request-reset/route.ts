import { NextRequest } from "next/server";
import connectToDatabase from "@/lib/mongodb";

import UserModel from "@/models/User";
import { generateResetToken } from "@/lib/token";
import mailSender from "@/lib/utility/mailSender";
import passwordResetTemplate from "@/email/templates/passwordResetTemplate";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return new Response(JSON.stringify({ error: "Email is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    await connectToDatabase();

    const user = await UserModel.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const resetToken = generateResetToken();
    const resetPasswordExpiresAt = new Date(Date.now() + 3600000); // Token valid for 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetPasswordExpiresAt;
    await user.save();

    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password/${resetToken}`;

    await mailSender({
      email: user.email,
      title: "Password Reset Request",
      body: passwordResetTemplate(resetLink),
    });

    return new Response(JSON.stringify({ message: "Password reset link sent to email" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}