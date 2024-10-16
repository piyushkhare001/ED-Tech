import { NextRequest, NextResponse } from 'next/server';
import { Course } from "../../../../models/Course"; // Adjust the path as necessary
import connectToMongoDB from "@/lib/mognodb";
import { Types } from 'mongoose';


// Handle GET requests
export async function GET(req: NextRequest) {
  try {
    await connectToMongoDB();
    const courses = await Course.find().populate('content purchasedBy createdBy');
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}

// Handle POST requests
export async function POST(req: NextRequest) {
  try {
    await connectToMongoDB();
    const body = await req.json();
    const course = new Course(body);
    await course.save();
    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}

// Handle PUT requests (optional)
export async function PUT(req: NextRequest) {
  try {
    await connectToMongoDB();
    const body = await req.json();
    const updatedCourse = await Course.findByIdAndUpdate(new Types.ObjectId(body._id), body, { new: true });
    if (!updatedCourse) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
    return NextResponse.json(updatedCourse, { status: 200 });
  } catch (error:any) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to update course' }, { status: 500 });
  }
}

// Handle DELETE requests (optional)
export async function DELETE(req: NextRequest) {
  try {
    await connectToMongoDB();
   const { id } = await req.json(); // Assuming you're passing the course ID as a query parameter
   const deletedCourse = await Course.findByIdAndDelete(id);
   if (!deletedCourse) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Course deleted successfully' }, { status: 200 });
  } catch (error:any) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 });
  }
}
