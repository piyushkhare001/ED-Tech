// src/app/api/profile/update/[userId].ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mognodb'; // Adjust import path as necessary
import Profile from '@/models/Profile'; // Adjust import path as necessary

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    const { userId } = req.query;

    if (req.method === 'POST') {
        if (!userId || Array.isArray(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        try {
            const updatedProfile = await Profile.findByIdAndUpdate(
                userId, 
                { ...req.body },
                { new: true }
            );

            if (!updatedProfile) {
                return res.status(404).json({ message: 'Profile not found' });
            }

            res.status(200).json({ data: updatedProfile });
        } catch (error) {
            res.status(500).json({ message: 'Error updating profile', error });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
