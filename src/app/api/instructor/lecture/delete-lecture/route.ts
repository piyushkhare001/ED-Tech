// // pages/api/delete-lecture.ts
// import dbConnect from '@/lib/mognodb'; // Ensure you have a DB connection utility
// import {Lecture} from '@/models/Lecture'; // Adjust the import based on your model path
// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'DELETE') {
//         const { id } = req.body;

//         if (!id) {
//             return res.status(400).json({ success: false, message: 'Missing id' });
//         }

//         try {
//             await dbConnect();

//             const deletedLecture = await Lecture.findByIdAndDelete(id);

//             if (!deletedLecture) {
//                 return res.status(404).json({ success: false, message: 'Lecture not found' });
//             }

//             return res.status(200).json({
//                 success: true,
//                 message: 'Lecture deleted successfully',
//                 data: deletedLecture,
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
import cloudinary from "../../../../config/cloudinary";
import { Readable } from "stream";

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
  const videoFile = formData.get("videoFile");
  const thumbnail = formData.get("thumbnail");
  const hidden = formData.get("hidden") === "true";

  if (!lectureId) {
    return NextResponse.json({ message: "Lecture ID is required" }, { status: 400 });
  }

  try {
    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
      return NextResponse.json({ message: "Lecture not found" }, { status: 404 });
    }

    const updateFields: any = {};

    // Update the fields if provided
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    updateFields.hidden = hidden !== undefined ? hidden : lecture.hidden;

    // Handle thumbnail update (if provided)
    if (thumbnail && typeof thumbnail !== "string") {
      // Delete the old thumbnail from Cloudinary
      if (lecture.thumbnail) {
        const publicId = lecture.thumbnail.split("/").pop()?.split(".")[0];
        await cloudinary.uploader.destroy(`course_thumbnails/${publicId}`);
      }

      // Upload new thumbnail
      const stream = Readable.from(thumbnail.stream());
      const uploadThumbnail = async (stream: Readable) => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "course_thumbnails" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          stream.pipe(uploadStream);
        });
      };
      const thumbnailResponse = await uploadThumbnail(stream);
      updateFields.thumbnail = (thumbnailResponse as { secure_url: string }).secure_url;
    }

    // Handle video update (if provided)
    if (videoFile) {
      // Delete the old video from Cloudinary
      if (lecture.video) {
        const publicId = lecture.video.split("/").pop()?.split(".")[0];
        await cloudinary.uploader.destroy(`courses_lecture_videos/${publicId}`, { resource_type: "video" });
      }

      // Upload new video
      const streamVideo = Readable.from(videoFile.stream());
      const uploadVideo = async (streamVideo: Readable) => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "courses_lecture_videos", resource_type: "video" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          streamVideo.pipe(uploadStream);
        });
      };
      const videoResponse = await uploadVideo(streamVideo);
      updateFields.video = (videoResponse as { secure_url: string }).secure_url;
    }

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
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error updating lecture", error: err },
      { status: 500 }
    );
  }
}
