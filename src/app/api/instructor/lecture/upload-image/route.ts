import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/mognodb";
import { Lecture } from "@/models/Lecture";
import { Course } from "@/models/Course";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../../lib/auth";
import cloudinary from "../../../../config/cloudinary";
import { Readable } from "stream";
import { Types } from "mongoose";

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  try {
    if (!session || session.user.role !== "teacher") {
      return NextResponse.json(
        { error: "Unauthorized: No session provided" },
        { status: 401 }
      );
    }
    await dbConnect();

    const formData = await req.formData();

    const thumbnail = formData.get("thumbnail");
    const lid = formData.get("lid");
    // Convert the File to a Readable stream
    const stream = Readable.from(thumbnail.stream());

    // Upload thumbnail to Cloudinary using a Promise-based approach
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
    if(lid){
        const lecture = await Lecture.findByIdAndUpdate({_id:new Types.ObjectId(lid)},{$set:{thumbnail:(thumbnailResponse as { secure_url: string }).secure_url}})
    }
        return NextResponse.json(
          {
            message: "Image Uploaded Successfully",
            img: (thumbnailResponse as { secure_url: string }).secure_url,
          },
          { status: 201 }
        );
    

  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
