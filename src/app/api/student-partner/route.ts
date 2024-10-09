import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/mognodb";

import StudentPartner from "@/models/StudentPartner";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        error: "The email is not associated with any Student Partner",
      });
    }
    try {
      await connectToDatabase();

      const studentPartnerPayload = await StudentPartner.findOne({ email });
      if (!studentPartnerPayload) {
        return res.status(404).json({
          success: false,
          message: "Student is not registered as a Student Partner",
        });
      }
      res.status(200).json({
        success: true,
        message: "Student Partner information retrieved successfully",
        data: studentPartnerPayload,
      });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
