
import { NextApiRequest, NextApiResponse } from 'next';
import  connectToDatabase  from '@/lib/mognodb';
import UserModel from '@/models/User';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { token, password , confirmPassword} = req.body;

    if (!token || !password || !confirmPassword) {
      return res.status(400).json({ error: 'Token and new password are required' });
    }

    try {
      await connectToDatabase();

      if(password === confirmPassword){
    
      const user = await UserModel.findOne({
        resetPasswordToken: token,
        resetPasswordExpiresAt: { $gt: Date.now() }, // Check if the token is still valid
      });

      if (!user) {
        return res.status(400).json({ error: 'Invalid or expired token' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpiresAt = undefined;

      await user.save();

      res.status(200).json({ message: 'Password reset successfully' });
    } else{
        res.status(500).json({ error: 'your password and confirm password are not matching' });
    }
    } catch (error :any) {
        console.log(error)
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
