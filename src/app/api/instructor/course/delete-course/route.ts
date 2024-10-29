import cloudinary from "../../../../config/cloudinary"; // Adjust the import path as necessary
import { NextRequest, NextResponse } from "next/server";
import { Course } from "../../../../../models/Course"; // Adjust the path as necessary
import connectToMongoDB from "@/lib/mognodb";
import { Lecture } from "@/models/Lecture";

export async function DELETE(req: NextRequest) {
  try {
    await connectToMongoDB();

    const { id } = await req.json(); // Assuming the ID is sent in the body as JSON

    const courseToDelete = await Course.findById(id);
    if (!courseToDelete) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    if (courseToDelete.imageUrl) {
      const publicId = extractPublicId(courseToDelete.imageUrl); // Extract public_id from imageUrl
      await cloudinary.uploader.destroy(`course_thumbnails/${publicId}`); // Remove image from Cloudinary
    }

    courseToDelete.content.map(async (e, i) => {
      try {
        const lectureToDelete = await Lecture.findById(e);
        if (!lectureToDelete) {
          return NextResponse.json(
            { error: "Lecture not found" },
            { status: 404 }
          );
        }
        if (lectureToDelete.thumbnail) {
          const publicId = extractPublicId(lectureToDelete.thumbnail); // Extract public_id from imageUrl
          await cloudinary.uploader.destroy(`course_thumbnails/${publicId}`); // Remove image from Cloudinary
        }
        if (lectureToDelete.video) {
          const publicId = extractPublicId(lectureToDelete.video); // Extract public_id from imageUrl
          await cloudinary.uploader.destroy(`courses_lecture_videos/${publicId}`); // Remove image from Cloudinary
        }

        await Lecture.findByIdAndDelete(e);
      } catch (error) {}
    });

    // Now delete the course from MongoDB
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return NextResponse.json(
        { message: "Failed to delete course" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Course deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to delete course" },
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
