import cloudinary from "../../../../config/cloudinary"; // Adjust the import path as necessary
import { NextRequest, NextResponse } from 'next/server';
import { Course } from "../../../../../models/Course"; // Adjust the path as necessary
import connectToMongoDB from "@/lib/mognodb";

export async function DELETE(req: NextRequest) {
  try {
    await connectToMongoDB();

    // Get course ID from the request body
    const { id } = await req.json(); // Assuming the ID is sent in the body as JSON
console.log(id);

    // Find the course to get its imageUrl before deletion
    const courseToDelete = await Course.findById(id);
    if (!courseToDelete) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // If an imageUrl exists, delete it from Cloudinary
    if (courseToDelete.imageUrl) {
      const publicId = extractPublicId(courseToDelete.imageUrl); // Extract public_id from imageUrl
      console.log(publicId);
      
      await cloudinary.uploader.destroy(`course_thumbnails/${publicId}`); // Remove image from Cloudinary
    }

    // Now delete the course from MongoDB
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return NextResponse.json({ error: 'Failed to delete course' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Course deleted successfully' }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 });
  }
}

// Utility function to extract public_id from imageUrl
function extractPublicId(imageUrl: string) {
  const urlParts = imageUrl.split('/');
  const publicIdWithExtension = urlParts[urlParts.length - 1];
  const publicId = publicIdWithExtension.split('.')[0]; // Remove the file extension
  return publicId;
}
