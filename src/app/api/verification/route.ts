
import { NextApiRequest, NextApiResponse } from 'next';
import  connectToDatabase  from '@/lib/mognodb';
import VerificationModel from '@/models/Verification';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and OTP are required' });
    }

    try {
      await connectToDatabase();

      const verification = await VerificationModel.findOne({ email });

      if (!verification || verification.otp !== otp) {
        return res.status(400).json({ error: 'Invalid OTP' });
      }


      if (new Date() > verification.otpExpiresAt) {
        return res.status(400).json({ error: 'OTP has expired' });
      }


      verification.verified = true;
      await verification.save();

      res.status(200).json({ message: 'OTP verified successfully' });

      
    } catch (error :any ) {
        console.log(error)
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
