
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import User from '@/models/User';
import dbConnect from '@/lib/mognodb';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect(); 
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    
  const userEmail = session?.user?.email;
  try {
    // Assuming you have a User model with a method to find a user by email
    const user = await User.findOne({ userEmail }); // Adjust this line according to your database setup
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  } else {
  // Method not allowed
  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

}