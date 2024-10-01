import { NextRequest, NextResponse } from 'next/server';
import { Course } from "../../../../models/Course"; // Adjust the path as necessary
import connectToMongoDB from "@/lib/mognodb";


export async function POST(request: Request) {
    try {
      await connectToMongoDB; 
      const { courseId, userId } = await request.json();
      const course = await Course.findById(courseId);
      if (!course) {
        return NextResponse.json({ message: 'Course not found' }, { status: 404 });
      }
      if (course.purchasedBy.includes(userId)) {
        return NextResponse.json({ message: 'You have already applied for this course' }, { status: 400 });
      }
      course.purchasedBy.push(userId);
      await course.save();
  
      return NextResponse.json({ message: 'Successfully applied for the course', course }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Something went wrong', error: error}, { status: 500 });
    }
  }