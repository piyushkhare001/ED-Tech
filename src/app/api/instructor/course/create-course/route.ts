import { NextRequest, NextResponse } from "next/server";
import { Course } from "../../../../../models/Course"; // Adjust the path to your course model
import connectToDatabase from "../../../../../lib/mognodb"; // Ensure you have the MongoDB connection function
import User from "../../../../../models/User"; // Assuming you have a User model for role validation
import cloudinary from "../../../../config/cloudinary";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../../lib/auth";
import { Readable } from 'stream'; // Import the Readable stream


export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const thumbnail = formData.get("thumbnail"); // This should be a File object
    const description = formData.get("description");
    const openToEveryone = formData.get("openToEveryone");
    const price = formData.get("price");

    // Get session
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized: No session provided" },
        { status: 401 }
      );
    }

    // Extract user email from session
    const userEmail = session?.user?.email;
    if (!userEmail) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid session structure" },
        { status: 401 }
      );
    }

    // Connect to the database
    await connectToDatabase();

    // Find the user by email
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if the user has the correct role
    if (user.role !== "teacher") {
      return NextResponse.json(
        { error: "Only teachers can create courses" },
        { status: 403 }
      );
    }

    // Check if thumbnail exists
    if (!thumbnail || typeof thumbnail === 'string') {
      return NextResponse.json({ message: "No thumbnail uploaded" }, { status: 400 });
    }

    // Convert the File to a Readable stream
    const stream = Readable.from(thumbnail.stream());

    // Upload thumbnail to Cloudinary using a Promise-based approach
    const uploadThumbnail = async (stream: Readable) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "course_thumbnails" },
          (error, result) => {
            if (error) {
              console.error("Error uploading thumbnail to Cloudinary:", error);
              return reject(error);
            }
            return resolve(result);
          }
        );
        stream.pipe(uploadStream);
      });
    };

    const thumbnailResponse = await uploadThumbnail(stream);
    
    // Create a new course
    const newCourse = new Course({
      appxCourseId: generateUniqueCourseId(),
      title,
      imageUrl: (thumbnailResponse as { secure_url: string }).secure_url, // Make sure to wait for this response to get the URL
      description,
      openToEveryone: Boolean(openToEveryone),
      price,
      createdBy: user._id,
      certIssued: false,
      
    });
    
    // Save the course to the database
    await newCourse.save();

    // Return success response
    return NextResponse.json(
      { message: "Course created successfully", course: newCourse },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Server Error:", error);
    if (error.name === "TokenExpiredError") {
      return NextResponse.json(
        { error: "Unauthorized: Token expired" },
        { status: 401 }
      );
    } else if (error.name === "JsonWebTokenError") {
      return NextResponse.json(
        { error: "Unauthorized: Invalid token" },
        { status: 401 }
      );
    } else {
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  }
}

// Helper function to generate a unique course ID
function generateUniqueCourseId(): string {
  return "COURSE-" + Math.random().toString(36).substring(2, 10).toUpperCase();
}
