import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import User, { IUser } from "@/models/User";
import mongoose from "mongoose";

export interface ICourse {
  _id?: mongoose.Types.ObjectId;
  appxCourseId: string;
  title: string;
  imageUrl: string;
  description: string;
  openToEveryone: boolean;
  price: number;
  content: mongoose.Types.ObjectId[];
  purchasedBy: mongoose.Types.ObjectId[];
  certIssued: boolean;
  createdBy: mongoose.Types.ObjectId;
  publish: boolean;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  if (!params.id) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 }
    );
  }

  try {
    const user = await User.findById(params.id)
      .populate({
        path: "courses.courseId",
        model: "Course",
        select: "appxCourseId title description imageUrl price openToEveryone",
      })
      .lean<IUser & { courses: { courseId: ICourse }[] }>();

    if (!user || !user.courses || user.courses.length === 0) {
      return NextResponse.json(
        { message: "No enrolled courses found" },
        { status: 404 }
      );
    }

    const enrolledCourses = user.courses
      .map((course) => {
        const courseData = course.courseId as unknown as ICourse | undefined;
        if (!courseData) return null; // Optionally handle undefined courseData case

        return {
          courseId: courseData._id,
          appxCourseId: courseData.appxCourseId,
          title: courseData.title,
          description: courseData.description,
          imageUrl: courseData.imageUrl,
          price: courseData.price,
          openToEveryone: courseData.openToEveryone,
          progressPercentage: course.progressPercentage,
        };
      })
      .filter(Boolean); // Filter out any null values if courseData was undefined

    return NextResponse.json(enrolledCourses, { status: 200 });
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching enrolled courses" },
      { status: 500 }
    );
  }
}
