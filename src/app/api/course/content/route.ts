import {Course} from "../../../../models/Course"; // Your Course model
import connectToMongoDB from '@/lib/mognodb';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"; // To get session
import { authOptions } from "../../../../lib/auth";

export async function POST(request: Request) {
  // Get the session from NextAuth
  const session = await getServerSession(authOptions);

  // Check if the user is authenticated and has the "teacher" role
  if (!session || session.user.role !== "teacher") {
    return NextResponse.json(
      { message: "Unauthorized access" },
      { status: 403 }
    ); // Respond with 403 Forbidden if not a teacher
  }

  await connectToMongoDB();

  try {
    const contentData = await request.json();

    const newContent = new Course(contentData);
    await newContent.save();

    return NextResponse.json(newContent, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error.", error },
      { status: 500 }
    );
  }
}


export async function GET() {
  await connectToMongoDB();

  try {
    const contents = await Course.find().populate('children courses');
    return NextResponse.json(contents);
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error.', error }, { status: 500 });
  }
}
