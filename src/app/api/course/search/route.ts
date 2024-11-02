import { NextResponse } from "next/server";
import { Course } from "../../../../models/Course"; // Adjust the path as necessary
import connectToMongoDB from "@/lib/mongodb";
import { Types } from "mongoose";

export async function GET(request: Request) {
  try {
    await connectToMongoDB(); // Ensure a database connection

    // Extract 'id', 'title', 'page', and 'limit' from query parameters
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const title = searchParams.get("title");
    const page = parseInt(searchParams.get("page") || "1"); // Default to page 1
    const limit = parseInt(searchParams.get("limit") || "10"); // Default to 10 items per page

    // Define skip value based on page and limit
    const skip = (page - 1) * limit;

    const searchCriteria: any = {};
    if (title) {
      searchCriteria.title = { $regex: title, $options: "i" }; // Case-insensitive search for title
    }

    console.log('_id=',id);
    
    // Add createdBy condition if id is provided
    if (id != null && id !== "null" && id !== "") {
      searchCriteria.createdBy = id;
    }

    // Fetch total courses count and the filtered courses
    const totalCourses = await Course.countDocuments(searchCriteria);
    const courses = await Course.find(searchCriteria).skip(skip).limit(limit);

    // Calculate total pages
    const totalPages = Math.ceil(totalCourses / limit);

    return NextResponse.json(
      {
        data: courses,
        currentPage: page,
        totalPages,
        totalCourses,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Error fetching courses" },
      { status: 500 }
    );
  }
}
