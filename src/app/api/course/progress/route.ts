// // app/api/progress/route.ts
// import { NextResponse } from 'next/server';
// import { User } from '../../../../models/User'; // Adjust the import path as needed
// import { Course } from '../../../../models/Course'; // Adjust the import path as needed
// import connectToMongoDB from '@/lib/mognodb';

// export async function PUT(request: Request) {
//   await connectToMongoDB();

//   try {
//     const { userId, courseId, contentId } = await request.json();

//     if (!userId || !courseId || !contentId) {
//       return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
//     }

//     // Find the user
//     const user = await User.findById(userId);
//     if (!user) {
//       return NextResponse.json({ message: 'User not found.' }, { status: 404 });
//     }

//     // Check if the user has progress for the course
//     let courseProgress = user.courses.find(c => c.courseId.equals(courseId));

//     // If no progress found, create a new progress entry
//     if (!courseProgress) {
//       courseProgress = {
//         courseId,
//         completedContent: [],
//         progressPercentage: 0,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       };
//       user.courses.push(courseProgress);
//     }

//     // Add the completed content
//     if (!courseProgress.completedContent.includes(contentId)) {
//       courseProgress.completedContent.push(contentId);
//     }

//     // Recalculate progress percentage
//     const course = await Course.findById(courseId).populate('content');
//     const totalContent = course.content.length;
//     const completedContentCount = courseProgress.completedContent.length;

//     // Update the progress percentage
//     courseProgress.progressPercentage = totalContent > 0 ? (completedContentCount / totalContent) * 100 : 0;
//     courseProgress.updatedAt = new Date(); // Update the timestamp

//     // Save the updated user document
//     await user.save();
//     return NextResponse.json(user);
//   } catch (error) {
//     return NextResponse.json({ message: 'Internal server error.', error }, { status: 500 });
//   }
// }

// export async function POST(request: Request) {
//   await connectToMongoDB();

//   try {
//     const { userId, courseId } = await request.json();
//     console.log(userId, courseId);
    
//     if (!userId || !courseId) {
//       return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
//     }

//     // Find the user
//     const user = await User.findById(userId);
//     if (!user) {
//       return NextResponse.json({ message: 'User not found.' }, { status: 404 });
//     }

//     // Find course progress for the user
//     const courseProgress = user.courses.find(c => c.courseId.equals(courseId));

//     if (!courseProgress) {
//       return NextResponse.json({ message: 'Course progress not found.' }, { status: 404 });
//     }

//     return NextResponse.json(courseProgress);
//   } catch (error) {
//     return NextResponse.json({ message: 'Internal server error.', error }, { status: 500 });
//   }
// }
