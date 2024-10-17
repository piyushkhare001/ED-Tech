import {Course} from "../../../../models/Course"; // Your Course model
import connectToMongoDB from '@/lib/mognodb';
import { NextResponse,NextRequest } from "next/server";
import { getServerSession } from "next-auth/next"; // To get session
import { authOptions } from "../../../../lib/auth";

export async function POST(req: NextRequest) {
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
    const contentData = await req.json();
    const content = await Course.findByIdAndUpdate(contentData._id,{$set:{content:contentData.data}})
    // const newContent = new Course(contentData);
    // await newContent.save();

    return NextResponse.json(content, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error.", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
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
    const { courseId } = await request.json(); // Assuming the course ID is passed in the request body

    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Course deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error.", error },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "teacher") {
    return NextResponse.json(
      { message: "Unauthorized access" },
      { status: 403 }
    );
  }

  await connectToMongoDB();

  try {
    const { courseId, updateData } = await request.json();

    const updatedCourse = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure the update follows the schema validation rules
    });

    if (!updatedCourse) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(updatedCourse, { status: 200 });
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
