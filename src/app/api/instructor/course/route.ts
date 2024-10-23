import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from "../../../../lib/mognodb"; // Ensure you have the MongoDB connection function
import { Course } from '../../../../models/Course'; // Adjust the path to your Course model
import { Types } from 'mongoose';
import { Lecture } from '@/models/Lecture';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Get the JSON body from the request
    const { id, page = 1, limit = 10 } = body; // Destructure the required fields and set default page and limit

    await connectToDatabase();

    const course = await Course.findById(new Types.ObjectId(id));
    if (!course) {
      return NextResponse.json({ message: 'Course not found' }, { status: 404 });
    }

    const lectureIds = course.content; // Assuming `content` holds lecture IDs

    // Fetch lectures based on the IDs and implement pagination
    const totalLectures = lectureIds.length; // Total number of lectures
    const startIndex = (page - 1) * limit; // Calculate the starting index
    const endIndex = startIndex + limit; // Calculate the ending index

    // Fetch only the relevant lecture IDs for the current page
    const paginatedLectureIds = lectureIds.slice(startIndex, endIndex);

    // Fetch the lectures based on the paginated IDs
    const lectures = await Lecture.find({ _id: { $in: paginatedLectureIds } });

    // Return the course information along with the paginated lectures
    return NextResponse.json(
      {
        message: 'Course found',
        course,
        totalLectures,
        currentPage: page,
        lectures,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
