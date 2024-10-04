// pages/api/delete-lecture.ts
import dbConnect from '@/lib/mognodb'; // Ensure you have a DB connection utility
import {Lecture} from '@/models/Lecture'; // Adjust the import based on your model path
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: 'Missing id' });
        }

        try {
            await dbConnect();

            const deletedLecture = await Lecture.findByIdAndDelete(id);

            if (!deletedLecture) {
                return res.status(404).json({ success: false, message: 'Lecture not found' });
            }

            return res.status(200).json({
                success: true,
                message: 'Lecture deleted successfully',
                data: deletedLecture,
            });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Server error', error });
        }
    } else {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}
