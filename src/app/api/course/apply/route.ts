import { NextRequest, NextResponse } from "next/server";
import { Course } from "../../../../models/Course";
import { User } from "../../../../models/User";
import connectToMongoDB from "@/lib/mognodb";
import { getServerSession } from "next-auth/next"; // To get session
import { authOptions } from "../../../../lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated and has the "teacher" role
    if (!session || session.user.role !== "student") {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 403 }
      ); // Respond with 403 Forbidden if not a teacher
    }
    await connectToMongoDB();

    const { courseId, userId } = await request.json();
    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (course.purchasedBy.includes(userId)) {
      return NextResponse.json(
        { message: "You have already applied for this course" },
        { status: 400 }
      );
    }
    course.purchasedBy.push(userId);
    //   user.courses.push({courseId});

    await course.save();
    await user.save();

    return NextResponse.json(
      { message: "Successfully applied for the course", course },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Something went wrong", error: error },
      { status: 500 }
    );
  }
}
