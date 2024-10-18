import { NextResponse,NextRequest } from "next/server";
import dbConnect from "@/lib/mognodb";
import { Lecture } from "@/models/Lecture";
import { Course } from "@/models/Course";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../../lib/auth";
import cloudinary from "../../../../config/cloudinary";
import { Readable } from "stream";

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "teacher") {
    return NextResponse.json(
      { error: "Unauthorized: No session provided" },
      { status: 401 }
    );
  }

  await dbConnect();

  const formData = await req.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const courseId = formData.get("courseId");
  const videoFile = formData.get("videoFile"); // This should be a file object
  const thumbnail = formData.get("thumbnail"); // Assuming thumbnail is optional
  const parentId = formData.get("parentId"); // Optional parent ID for folder structure
  const hidden = formData.get("hidden") === "true"; // Optional hidden flag
  const type = formData.get("type") || "folder"; // Default to 'folder'

  if (!title || !description || !courseId) {
    return NextResponse.json({ message: "Missing required fields" });
  }
  // console.log("file", videoFile);

  try {
    // Check if thumbnail exists
    if (!thumbnail || typeof thumbnail === "string") {
      return NextResponse.json(
        { error: "No thumbnail uploaded" },
        { status: 400 }
      );
    }

    const stream = Readable.from(thumbnail.stream());
    const uploadThumbnail = async (stream: Readable) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "course_thumbnails" },
          (error, result) => {
            if (error) {
              console.error("Error uploading thumbnail to Cloudinary:", error);
              return reject(error);
            }
            return resolve(result);
          }
        );
        stream.pipe(uploadStream);
      });
    };
    const thumbnailResponse = await uploadThumbnail(stream);

    const streamVideo = Readable.from(videoFile.stream());
    const uploadVideo = async (streamVideo: Readable) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "courses_lecture_videos" ,resource_type:'video'},
          (error, result) => {
            if (error) {
              console.error("Error uploading thumbnail to Cloudinary:", error);
              return reject(error);
            }
            return resolve(result);
          }
        );
        streamVideo.pipe(uploadStream);
      });
    };
    const videoResponse = await uploadVideo(streamVideo);
console.log((videoResponse as { secure_url: string }).secure_url);

    const newLecture = await Lecture.create({
      type,
      title,
      description,
      thumbnail: (thumbnailResponse as { secure_url: string }).secure_url || null, // Optional thumbnail
      parentId: parentId || null,
      hidden,
      video: (videoResponse as { secure_url: string }).secure_url ||null,
    });

    // Update the related course by adding the new lecture
    await Course.findByIdAndUpdate(courseId, {
      $push: { content: newLecture._id },
    });

    return NextResponse.json({
      success: true,
      message: "Lecture added successfully",
      data: newLecture,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error storing lecture", error: err },
      { status: 500 }
    );
  }
}

// ----------------------------------------------------------------------------------------------------------------------------
// import { NextApiRequest, NextApiResponse } from 'next';
// import dbConnect from '@/lib/mognodb';
// import { Lecture } from '@/models/Lecture';
// import { getServerSession } from "next-auth/next"; // To get session
// import { authOptions } from "../../../../lib/auth";
// import cloudinary from '../../../config/cloudinary';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {

//   if (req.method === 'POST') {
//   const session = await getServerSession(authOptions);

//   if (!session || session.user.role !== "teacher") {
//     return Response.json(
//       { message: "Unauthorized access" },
//       { status: 403 }
//     );
//   }
//   await dbConnect();

//   const { title, description, videoUrl, courseId } = req.body;

//   if (!title || !description || !videoUrl || !courseId) {
//     return res.status(400).json({ message: 'Missing fields' });
//   }

//   const videoResponse = await cloudinary.uploader.upload(videoUrl, {
//     resource_type: 'video',
//     folder: 'coursesLecture',
//   });
//   try {

//     const newLecture = await Lecture.create({
//       type: 'lecture',
//       title,
//       description,
//       videoUrl : videoResponse.secure_url,
//       courseId,
//     });

//     await Lecture.findByIdAndUpdate(courseId, {
//       $push: { lectures: newLecture._id },
//     });

//     return res.status(201).json({
//       success: true,
//       message: 'Lecture added successfully',
//       data: newLecture,
//     });
//   } catch (error) {
//     return res.status(500).json({ message: 'Error storing lecture', error });
//   }
// }
// }

 // for  frontend reference
// import { useState } from 'react';
// import axios from 'axios';

// const UploadLecture = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [videoFile, setVideoFile] = useState(null);

//   const handleFileChange = (e) => {
//     setVideoFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!videoFile) {
//       alert('Please upload a video file');
//       return;
//     }

//     // Upload video to Cloudinary
//     const formData = new FormData();
//     formData.append('file', videoFile);
//     formData.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // Cloudinary upload preset

//     // Upload video to Cloudinary
//     const uploadResponse = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`, formData);

//     const videoUrl = uploadResponse.data.secure_url; // Get the video URL from response

//     // Submit lecture data to the backend
//     await fetch('/api/add-lecture', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ title, description, videoUrl }),
//     });

//     alert('Lecture added successfully!');
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         required
//       />
//       <textarea
//         placeholder="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         required
//       />
//       <input type="file" accept="video/*" onChange={handleFileChange} required />
//       <button type="submit">Add Lecture</button>
//     </form>
//   );
// };

// export default UploadLecture;
