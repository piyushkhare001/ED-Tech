import { NextResponse } from 'next/server';
import { Course } from "../../../models/Course"; // Adjust the path as necessary
import connectToMongoDB from "@/lib/mognodb";
import { Types } from 'mongoose';
import { Lecture } from '@/models/Lecture';

export async function POST(request: Request) {
    try {
      await connectToMongoDB();
      const {id} = await request.json();
      if (!id) {
        return NextResponse.json({messsage:'Please enter id of the course.'}, { status: 400 });
      }

      const course = await Course.findById(new Types.ObjectId(id));
      const lectures = await Lecture.find({ _id: { $in: course?.content } }, {_id:1, title: 1, type: 1, duration: 1, completed: 1 });
      return NextResponse.json({ course,lectures }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Something went wrong', error: error}, { status: 500 });
    }
  }