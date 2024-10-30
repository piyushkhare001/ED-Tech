import { NextResponse } from "next/server";
import { Course } from "../../../models/Course"; // Adjust the path as necessary
import connectToMongoDB from "@/lib/mongodb";
import { Types } from "mongoose";
import { Lecture } from "@/models/Lecture";

export async function POST(request: Request) {
  try {
    await connectToMongoDB();
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json(
        { messsage: "Please enter id of the course." },
        { status: 400 }
      );
    }

    const lecture = await Lecture.findById(new Types.ObjectId(id));
    return NextResponse.json({ lecture }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error: error },
      { status: 500 }
    );
  }
}
