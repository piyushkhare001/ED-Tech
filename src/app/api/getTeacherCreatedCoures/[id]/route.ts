import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/lib/mognodb';
import { Course  } from '@/models/Course';
import mongoose from 'mongoose';
export interface ICourse {
  _id: mongoose.Types.ObjectId; // Add _id property here
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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  if (!params.id) {
    return NextResponse.json({ message: 'Teacher ID is required' }, { status: 400 });
  }

  try {
    // Find courses created by the teacher
    const courses = await Course.find({ createdBy: params.id })
      .select('appxCourseId title description imageUrl price openToEveryone publish')
      .lean<ICourse[]>();

    if (!courses || courses.length === 0) {
      return NextResponse.json({ message: 'No courses found for this teacher' }, { status: 404 });
    }

    const teacherCourses = courses.map((course) => ({
      courseId: course._id,
      appxCourseId: course.appxCourseId,
      title: course.title,
      description: course.description,
      imageUrl: course.imageUrl,
      price: course.price,
      openToEveryone: course.openToEveryone,
      publish: course.publish,
    }));

    return NextResponse.json(teacherCourses, { status: 200 });
  } catch (error) {
    console.error('Error fetching teacher courses:', error);
    return NextResponse.json({ message: 'An error occurred while fetching teacher courses' }, { status: 500 });
  }
}
