// import { NextRequest, NextResponse } from 'next/server';
// import { Course } from "../../../../../models/Course"; // Adjust the path as necessary
// import connectToMongoDB from "@/lib/mognodb";


// export async function PUT(req: NextRequest) {
//   try {
//     await connectToMongoDB();
//     const body = await req.json();
//     const updatedCourse = await Course.findByIdAndUpdate(body._id, body.data, { new: true });
//     if (!updatedCourse) {
//       return NextResponse.json({ error: 'Course not found' }, { status: 404 });
//     }
//     return NextResponse.json(updatedCourse, { status: 200 });
//   } catch (error:any) {
//     console.log(error)
//     return NextResponse.json({ error: 'Failed to update course' }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from 'next/server';
import { Course } from "../../../../../models/Course"; // Adjust the path as necessary
import connectToMongoDB from "@/lib/mognodb";
import { Readable } from 'stream'; // Import stream to handle file uploads
import mongoose from "mongoose"; // Import mongoose for ObjectId conversion
import cloudinary from "../../../../config/cloudinary";

export async function PUT(req: NextRequest) {
  try {
    await connectToMongoDB();

    // Get form data
    const formData = await req.formData();
    const courseId = formData.get("_id") as string; // Assuming _id is sent in the form data
    const updatedData: any = {}; // Create an object to hold the updated course data

    // Check if the image should be removed
    const removeImage = formData.get("removeImage");
    if (removeImage === "true") {
      updatedData.imageUrl = null; // Set imageUrl to null to remove it
    } else {
      // Check if a new thumbnail has been uploaded
      const thumbnail = formData.get("thumbnail");
      if (thumbnail && typeof thumbnail !== 'string') {
        const stream = Readable.from(thumbnail.stream()); // Create a readable stream from the uploaded file

        // Upload the new thumbnail image to Cloudinary
        const thumbnailResponse = await cloudinary.uploader.upload(stream, {
          folder: "course_thumbnails",
        });

        // Add the thumbnail URL to the updated data
        updatedData.imageUrl = thumbnailResponse.secure_url; // Update to 'imageUrl' based on your schema
      }
    }

    // Populate other fields if they exist in the form data
    const title = formData.get("title");
    const appxCourseId = formData.get("appxCourseId");
    const description = formData.get("description");
    const openToEveryone = formData.get("openToEveryone");
    const price = formData.get("price");
    const content = formData.get("content"); // Assuming content is sent in the form data as an array of ObjectId strings

    if (title) updatedData.title = title;
    if (appxCourseId) updatedData.appxCourseId = appxCourseId;
    if (description) updatedData.description = description;
    if (openToEveryone) updatedData.openToEveryone = Boolean(openToEveryone);
    if (price) updatedData.price = price;

    // Handle content (assuming it's an array of ObjectId strings)
    if (content) {
      updatedData.content = Array.isArray(content) ? content.map(id => new mongoose.Types.ObjectId(id)) : [];
    }
    console.log(updatedData);
    
    const updatedCourse = await Course.findByIdAndUpdate(courseId, {$set:{...updatedData}}, { new: true });
    if (!updatedCourse) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
    
    // Return the updated course
    return NextResponse.json(updatedCourse, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to update course' }, { status: 500 });
  }
}
