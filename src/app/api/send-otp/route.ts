
import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase  from "@/lib/mognodb"
import VerificationModel from '@/models/Verification';
import { generateOtp } from '@/lib/otp';
//import mailSender from "@/lib/utils/mailSender"
//import otpTemplate from '@/email/templates/emailVerificationTemplate';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    try {

      const otp = generateOtp();
       if (otp){
      const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); 

       await connectToDatabase();

      await VerificationModel.findOneAndUpdate(
        { email },
        { email, otp, otpExpiresAt, verified: false },
        { upsert: true }
      );
    }
    
  //    await mailSender(email,`your otp is ${otp}` , otpTemplate(otp )  );
 else{
    res.status(500).json({ message: 'please  try again to send otp' });

    }
 
      res.status(200).json({ message: 'OTP sent' });
    } catch (error : any) {
        console.log(error)
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
