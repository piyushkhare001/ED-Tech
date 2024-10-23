import cloudinary from "@/app/config/cloudinary";
import { Lecture } from "@/models/Lecture";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const lid = formData.get('lid');
    console.log(lid);
    
    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    // Convert file to buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Wrap the Cloudinary upload_stream in a Promise
    const uploadToCloudinary = (fileBuffer: Buffer): Promise<{ secure_url: string }> => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "video", folder: "courses_lecture_videos" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        uploadStream.end(fileBuffer); // End the stream with the file buffer
      });
    };

    // Await the result from Cloudinary upload
    const result = await uploadToCloudinary(fileBuffer);
    if(lid){
        const lecture = await Lecture.findByIdAndUpdate(new Types.ObjectId(lid),{$set:{video:result.secure_url,type:'video'}})
    }
    return NextResponse.json({ secure_url: result.secure_url }, { status: 200 });
  } catch (error) {
    console.error("Error uploading video:", error);
    return NextResponse.json({ error: "Video upload failed." }, { status: 500 });
  }
}
