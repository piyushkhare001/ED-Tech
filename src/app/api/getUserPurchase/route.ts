

import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import Purchase from '@/models/Purchase';
import dbConnect from '@/lib/mognodb';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect(); 
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }


    
  const userId = session?.user?.id;
  try {
    // Assuming you have a User model with a method to find a user by email
    const validUser = await Purchase.findById({ userId }); // Adjust this line according to your database setup
    if (!validUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(validUser);
    console.log('find  a purchse ' , validUser)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  }

