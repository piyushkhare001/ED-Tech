// app/api/courses/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mognodb'; // Ensure this file manages MongoDB connection
import {Course} from '@/models/Course';

export async function GET() {
  await dbConnect();

  try {
    const courses = await Course.find({});
    return NextResponse.json({ success: true, data: courses });
  } catch (error : any) {
    return NextResponse.json(
      { success: false, message: 'Error fetching courses', error: error.message },
      { status: 500 }
    )
  }
}
