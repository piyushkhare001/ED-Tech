import { NextRequest, NextResponse } from "next/server";
import { Course } from "../../../../../models/Course"; // Adjust the path as necessary
import connectToMongoDB from "@/lib/mognodb";
import { Readable } from "stream"; // Import stream to handle file uploads
import mongoose from "mongoose"; // Import mongoose for ObjectId conversion
import cloudinary from "../../../../config/cloudinary";
import User from "@/models/User";
import { Lecture } from "@/models/Lecture";

export async function POST(req: NextRequest) {
  try {
    await connectToMongoDB();

    const formData = await req.formData();
    const courseId = formData.get("id") as string; // Assuming _id is sent in the form data
    const updatedData: any = {}; // Create an object to hold the updated course data

    const course = await Course.findById(new mongoose.Types.ObjectId(courseId));
    const removeImage = formData.get("removeImage");
    if (removeImage === "true") {
      updatedData.imageUrl = null;
      try {
        if (course) {
          const publicId = extractPublicId(course.imageUrl); // Extract public_id from imageUrl
          await cloudinary.uploader.destroy(`course_thumbnails/${publicId}`);
        }
      } catch (e) {}
    } else {
      const thumbnail = formData.get("thumbnail");
      if (thumbnail || typeof thumbnail === "string") {
        const stream = Readable.from((thumbnail as File).stream());
        const uploadThumbnail = async (stream: Readable) => {
          return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { folder: "course_thumbnails" },
              (error, result) => {
                if (error) {
                  console.error(
                    "Error uploading thumbnail to Cloudinary:",
                    error
                  );
                  return reject(error);
                }
                return resolve(result);
              }
            );
            stream.pipe(uploadStream);
          });
        };

        const thumbnailResponse = await uploadThumbnail(stream);
        try {
          if (course) {
            const publicId = extractPublicId(course.imageUrl); // Extract public_id from imageUrl
            const data = await cloudinary.uploader.destroy(
              `course_thumbnails/${publicId}`
            );
          }
        } catch (e) {}
        updatedData.imageUrl = (
          thumbnailResponse as { secure_url: string }
        ).secure_url;
      }
    }
    // Populate other fields if they exist in the form data
    const title = formData.get("title");
    const appxCourseId = formData.get("appxCourseId");
    const description = formData.get("description");
    const openToEveryone = formData.get("openToEveryone");
    const price = formData.get("price");
    const publish = formData.get("publish");

    if (title) updatedData.title = title;
    if (appxCourseId) updatedData.appxCourseId = appxCourseId;
    if (description) updatedData.description = description;
    if (openToEveryone !== null)
      updatedData.openToEveryone = openToEveryone === "true" ? true : false;
    if (publish !== null)
      updatedData.publish = publish === "true" ? true : false;
    if (price) updatedData.price = price;

    const updatedCourse = await Course.findByIdAndUpdate(
      new mongoose.Types.ObjectId(courseId),
      { $set: { ...updatedData } }
    );
    if (!updatedCourse) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    
    const lectureIds = updatedCourse.content; 
    const lectures = await Lecture.find({ _id: { $in: lectureIds } });
    // Return the updated course
    return NextResponse.json({...updatedCourse,lectures}, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update course" },
      { status: 500 }
    );
  }
}
function extractPublicId(imageUrl: string) {
  if (imageUrl) {
    const urlParts = imageUrl.split("/");
    const publicIdWithExtension = urlParts[urlParts.length - 1];
    const publicId = publicIdWithExtension.split(".")[0]; // Remove the file extension
    return publicId;
  }
  return null;
}
