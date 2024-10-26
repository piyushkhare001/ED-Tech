// import dbConnect from '@/lib/mognodb';
// import {Lecture} from '@/models/Lecture';
// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'PUT') {
//         const { id, title, description, videoUrl } = req.body;

//         if (!id || !title || !description || !videoUrl) {
//             return res.status(400).json({ success: false, message: 'Missing fields' });
//         }

//         try {
//             await dbConnect();

//             const updatedLecture = await Lecture.findByIdAndUpdate(
//                 id,
//                 { title, description, videoUrl },
//                 { new: true } // Return the updated document
//             );

//             if (!updatedLecture) {
//                 return res.status(404).json({ success: false, message: 'Lecture not found' });
//             }

//             return res.status(200).json({
//                 success: true,
//                 message: 'Lecture updated successfully',
//                 data: updatedLecture,
//             });
//         } catch (error) {
//             return res.status(500).json({ success: false, message: 'Server error', error });
//         }
//     } else {
//         return res.status(405).json({ success: false, message: 'Method not allowed' });
//     }
// }

import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/mognodb";
import { Lecture } from "@/models/Lecture";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../../lib/auth";

export async function PUT(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "teacher") {
    return NextResponse.json(
      { error: "Unauthorized: No session provided" },
      { status: 401 }
    );
  }

  await dbConnect();

  const formData = await req.formData();
  const lectureId = formData.get("lectureId");
  const title = formData.get("title");
  const description = formData.get("description");
  const video = formData.get("video");
  const thumbnail = formData.get("thumbnail");
  const type = formData.get("type");
  const hidden = formData.get("hidden") === "true";
  console.log(lectureId);
  if (!lectureId) {
    return NextResponse.json(
      { message: "Lecture ID is required" },
      { status: 400 }
    );
  }

  try {
    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
      return NextResponse.json(
        { message: "Lecture not found" },
        { status: 404 }
      );
    }

    const updateFields: any = {};

    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (video) updateFields.video = video;
    if (thumbnail) updateFields.thumbnail = thumbnail;
    if (hidden !== null) updateFields.hidden = hidden;
    if (type) updateFields.type = type;

    // Perform the update using $set
    const updatedLecture = await Lecture.findByIdAndUpdate(
      lectureId,
      { $set: updateFields },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Lecture updated successfully",
      data: updatedLecture,
      thumbnail,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error updating lecture", error: err },
      { status: 500 }
    );
  }
}
