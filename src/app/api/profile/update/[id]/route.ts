// In your API route file (e.g., /api/profile/update)
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb'; // Adjust path as necessary
import Profile from '@/models/Profile'; // Adjust path as necessary

export async function PUT(req : Request, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    // Make sure to destructure all necessary fields from the request body
    const { dateOfBirth, gender, mobile, about, address, collegeName } = await req.json();

    // Check for missing fields
    if (!dateOfBirth || !gender || !mobile || !about || !address || !collegeName) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }
    console.log('Received data:', { dateOfBirth, gender, mobile, about, address, collegeName });

    // You should also handle the user ID in your request
    // Assuming you have a user ID available to identify the profile
    const userId = params.id // Adjust how you get the user ID, e.g., from query or request body
 console.log( " userId " , userId)
    const updatedProfile = await Profile.findByIdAndUpdate(userId, {
      dateOfBirth,
      gender,
      mobile,
      about,
      address,
      collegeName
    }, {
      new: true, // Return the updated document
      runValidators: true ,
      // Ensure Mongoose validates the update
      upsert: true
    });

    if (!updatedProfile) {
      return NextResponse.json({ message: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json(updatedProfile, { status: 200 });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
