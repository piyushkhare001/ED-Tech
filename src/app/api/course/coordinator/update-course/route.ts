// import { NextRequest, NextResponse } from 'next/server';
// import { Course } from "../../../../../models/Course"; // Adjust the path as necessary
// import connectToMongoDB from "@/lib/mognodb";


// export async function PUT(req: NextRequest) {
//   try {
//     await connectToMongoDB();
//     const body = await req.json();
//     const { id } = req.nextUrl.searchParams; // Assuming you're passing the course ID as a query parameter
//     const updatedCourse = await Course.findByIdAndUpdate(id, body, { new: true });
//     if (!updatedCourse) {
//       return NextResponse.json({ error: 'Course not found' }, { status: 404 });
//     }
//     return NextResponse.json(updatedCourse, { status: 200 });
//   } catch (error:any) {
//     console.log(error)
//     return NextResponse.json({ error: 'Failed to update course' }, { status: 500 });
//   }
//}