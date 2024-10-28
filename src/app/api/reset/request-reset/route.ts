import {  NextApiResponse } from "next";
import connectToDatabase from "@/lib/mognodb";
import UserModel from "@/models/User";
import { generateResetToken } from "@/lib/token";
// import mailSender from "@/lib/utility/mailSender";
// import passwordResetTemplate from "@/email/templates/passwordResetTemplate";

export default async function POST(
  req: Request,
  res: NextApiResponse
) {

  const { email } = await req.json();

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    await connectToDatabase();

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const resetToken = generateResetToken();
    const resetPasswordExpiresAt = new Date(Date.now() + 3600000); // Token valid for 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetPasswordExpiresAt;
    await user.save();

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`;
    console.log(resetLink);

    // await mailSender({
    //   email: user.email,
    //   title: "Password Reset Request",
    //   body: passwordResetTemplate(resetLink),
    // });

    res.status(200).json({ message: "Password reset link sent to email" });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}
