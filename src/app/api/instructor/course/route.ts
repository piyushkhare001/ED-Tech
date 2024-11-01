import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongodb"; // Ensure you have the MongoDB connection function
import { Course } from "../../../../models/Course"; // Adjust the path to your Course model
import { Types } from "mongoose";
import { Lecture } from "@/models/Lecture";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Get the JSON body from the request
    const { id } = body; // Destructure the required fields and set default page and limit

    await connectToDatabase();

    const course = await Course.findById(new Types.ObjectId(id));
    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    const lectureIds = course.content; // Assuming `content` holds lecture IDs
    const lectures = await Lecture.find({ _id: { $in: lectureIds } });
    console.log(lectures);
    
    return NextResponse.json(
      {
        message: "Course found",
        course,
        lectures,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
