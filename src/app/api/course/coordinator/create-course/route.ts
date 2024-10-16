import { NextRequest, NextResponse } from 'next/server';
import { Course } from '../../../../../models/Course'; // Adjust the path to your course model
import connectToDatabase from '../../../../../lib/mognodb'; // Ensure you have the MongoDB connection function
import User from '../../../../../models/User'; // Assuming you have a User model for role validation
import cloudinary from '../../../../config/cloudinary';
import { getServerSession } from 'next-auth/next';
import {authOptions} from "../../../../../lib/auth"



export async function POST(req: NextRequest) {
  try {
    const { title, thumbnail, description, openToEveryone, price } = await req.json();
    
    // Check for the JWT token in the Authorization header


    const session = await getServerSession(authOptions);
 
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized: No session provided' }, { status: 401 });
    }

    // Verify the JWT token
    // const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    
    // if (!decodedToken) {
    //   return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
    // }

    // Extract user email from the decoded token
    const userEmail = session?.user?.email;
    if (!userEmail) {
      return NextResponse.json({ error: 'Unauthorized: Invalid session structure' }, { status: 401 });
    }

    // Connect to the database
    await connectToDatabase();

    // Find the user by email
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if the user has the correct role
    if (user.role !== 'teacher') {
      return NextResponse.json({ error: 'Only teachers can create courses' }, { status: 403 });
    }

    const thumbnailResponse = await cloudinary.uploader.upload(thumbnail, {
      folder: 'course_thumbnails',
    });

    // Create a new course
    const newCourse = new Course({
      appxCourseId: generateUniqueCourseId(),
      title,
      thumbnailUrl: thumbnailResponse.secure_url,
      description,
      openToEveryone,
      price,
      createdBy: user._id,
      certIssued: false,
    });

    // Save the course to the database
    await newCourse.save();

    // Return success response
    return NextResponse.json({ message: 'Course created successfully', course: newCourse }, { status: 201 });

  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return NextResponse.json({ error: 'Unauthorized: Token expired' }, { status: 401 });
    } else if (error.name === 'JsonWebTokenError') {
      return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
    } else {
      console.error('Server Error:', error);
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
  }
}

// Helper function to generate a unique course ID
function generateUniqueCourseId(): string {
  return 'COURSE-' + Math.random().toString(36).substring(2, 10).toUpperCase();
}
