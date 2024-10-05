import { NextResponse } from 'next/server';
import { Course } from "../../../../models/Course"; // Adjust the path as necessary
import connectToMongoDB from "@/lib/mognodb";

export async function POST(request: Request) {
    try {
      await connectToMongoDB();
      const { title, description, openToEveryone } = await request.json();
      const searchCriteria: any = {};
      if (title) {
        searchCriteria.title = { $regex: title, $options: 'i' };
      }
      if (description) {
        searchCriteria.description = { $regex: description, $options: 'i' };
      }
      if (typeof openToEveryone !== 'undefined') {
        searchCriteria.openToEveryone = openToEveryone;
      }
      const courses = await Course.find(searchCriteria);
      return NextResponse.json({ courses }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Something went wrong', error: error}, { status: 500 });
    }
  }