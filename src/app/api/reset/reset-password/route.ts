import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mognodb'; // Ensure the correct spelling of 'mongodb'
import UserModel from '@/models/User';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  try {
    // Parse JSON request
    const { token, password } = await req.json();

    // Check if token and password are provided
    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and new password are required' },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDatabase();

    // Find the user with the provided token and check if the token is still valid
    const user = await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    // If no user found or token is invalid/expired
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Update the user's password and reset the token fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    // Save the user data
    await user.save();

    // Return success response
    return NextResponse.json(
      { message: 'Password reset successfully' },
      { status: 200 }
    );
    
  } catch (error: any) {
    // Log the error for debugging purposes
    console.error('Error during password reset:', error.message);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
