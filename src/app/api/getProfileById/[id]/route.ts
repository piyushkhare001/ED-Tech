import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mognodb'; // Adjust the path as necessary
import Profile from '@/models/Profile'; // Adjust the path as necessary

 export async function GET(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();


  try {
    const user = await Profile.findById(params.id); // Fetch the user by ID
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
