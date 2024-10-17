
// import { NextRequest, NextResponse } from 'next/server';
// import { Course } from "../../../../../models/Course"; // Adjust the path as necessary
// import connectToMongoDB from "@/lib/mognodb";

// export async function DELETE(req: NextRequest) {
//   try {
//     await connectToMongoDB();
//    const { id } = req.nextUrl.searchParams; // Assuming you're passing the course ID as a query parameter
//    const deletedCourse = await Course.findByIdAndDelete(id);
//    if (!deletedCourse) {
//       return NextResponse.json({ error: 'Course not found' }, { status: 404 });
//     }
//     return NextResponse.json({ message: 'Course deleted successfully' }, { status: 200 });
//   } catch (error:any) {
//     console.log(error)
//     return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 });
//   }

// }