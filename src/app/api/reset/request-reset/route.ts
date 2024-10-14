import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/mognodb";
import UserModel from "@/models/User";
import { generateResetToken } from "@/lib/token";
import mailSender from "@/lib/utility/mailSender";
import passwordResetTemplate from "@/email/templates/passwordResetTemplate";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email } = req.body;

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

      await mailSender(
        user.email,
        "Password Reset Request",
        passwordResetTemplate(resetLink)
      );

      res.status(200).json({ message: "Password reset link sent to email" });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
