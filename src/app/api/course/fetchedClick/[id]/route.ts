// pages/api/courses/[id]/route.ts
import { NextResponse } from 'next/server'; // Use NextResponse for the new router
import dbConnect from '@/lib/mognodb'; // Import your database connection
import { Course } from '@/models/Course'; // Import your Course model

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();

  // Extract the id directly from params
  const { id } = params;

  try {
    const course = await Course.findById(id);
    if (course) {
      return NextResponse.json({ success: true, data: course }); // Return the course details if found
    } else {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 }); // Handle course not found
    }
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }); // Handle any other errors
  }
}
