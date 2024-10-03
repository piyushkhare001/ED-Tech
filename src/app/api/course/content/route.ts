// app/api/content/route.ts
import { NextResponse } from 'next/server';
//import mongoose from 'mongoose';
import { Content } from '../../../../models/Content'; // Adjust the import path as needed
import connectToMongoDB from '@/lib/mognodb';

// Handle GET and POST requests for Content
export async function POST(request: Request) {
  await connectToMongoDB();

  try {
    const contentData = await request.json();

    const newContent = new Content(contentData);
    await newContent.save();

    return NextResponse.json(newContent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error.', error }, { status: 500 });
  }
}

// export async function GET() {
//   await connectToMongoDB();

//   try {
//     const contents = await Content.find().populate('children courses');
//     return NextResponse.json(contents);
//   } catch (error) {
//     return NextResponse.json({ message: 'Internal server error.', error }, { status: 500 });
//   }
// }
