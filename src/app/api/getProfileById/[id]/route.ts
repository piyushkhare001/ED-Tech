import { NextResponse } from 'next/server';

import dbConnect from '@/lib/mognodb'; // Adjust the path as necessary
import Profile from '@/models/Profile'; // Import your User model


export async function GET(request: Request, { params }: { params: { id: string } }) {
  // Connect to the database
  await dbConnect();

  try {
    const user = await Profile.findById(params.id); // Fetch the user by ID
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    console.log( "user profile details find from getById  ", user )
    return NextResponse.json(user, { status: 200 });
  
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}






















