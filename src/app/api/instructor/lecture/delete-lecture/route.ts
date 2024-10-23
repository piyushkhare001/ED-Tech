import cloudinary from "../../../../config/cloudinary"; // Adjust the import path as necessary
import { NextRequest, NextResponse } from "next/server";
import { Course } from "../../../../../models/Course"; // Adjust the path as necessary
import connectToMongoDB from "@/lib/mognodb";
import { Lecture } from "@/models/Lecture";
import { Types } from "mongoose";

export async function POST(req: NextRequest) {
  try {
    await connectToMongoDB();

    // Get lecture ID from the request body
    const { id, lid } = await req.json(); // Assuming the ID is sent in the body as JSON
    console.log(id,lid);
    
    // Find the lecture to get its imageUrl before deletion
    const lectureToDelete = await Lecture.findById(new Types.ObjectId(lid));
    if (!lectureToDelete) {
      return NextResponse.json({ error: "Lecture not found" }, { status: 404 });
    }

    const course = await Course.findByIdAndUpdate(new Types.ObjectId(lid), {
      $pull: { content: lid },
    });

    // If an imageUrl exists, delete it from Cloudinary
    if (lectureToDelete.imageUrl) {
      const publicId = extractPublicId(lectureToDelete.imageUrl); // Extract public_id from imageUrl
      console.log(publicId);

      await cloudinary.uploader.destroy(`course_thumbnails/${publicId}`); // Remove image from Cloudinary
    }

    // Now delete the lecture from MongoDB
    const deletedlecture = await Lecture.findByIdAndDelete(new Types.ObjectId(lid));
    
    if (!deletedlecture) {
      return NextResponse.json(
        { message: "Failed to delete lecture" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Lecture deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to delete lecture" },
      { status: 500 }
    );
  }
}

// Utility function to extract public_id from imageUrl
function extractPublicId(imageUrl: string) {
  const urlParts = imageUrl.split("/");
  const publicIdWithExtension = urlParts[urlParts.length - 1];
  const publicId = publicIdWithExtension.split(".")[0]; // Remove the file extension
  return publicId;
}
