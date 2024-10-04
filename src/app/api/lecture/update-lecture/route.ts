
import dbConnect from '@/lib/mognodb'; 
import {Lecture} from '@/models/Lecture';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const { id, title, description, videoUrl } = req.body;

        if (!id || !title || !description || !videoUrl) {
            return res.status(400).json({ success: false, message: 'Missing fields' });
        }

        try {
            await dbConnect();

            const updatedLecture = await Lecture.findByIdAndUpdate(
                id,
                { title, description, videoUrl },
                { new: true } // Return the updated document
            );

            if (!updatedLecture) {
                return res.status(404).json({ success: false, message: 'Lecture not found' });
            }

            return res.status(200).json({
                success: true,
                message: 'Lecture updated successfully',
                data: updatedLecture,
            });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Server error', error });
        }
    } else {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}
