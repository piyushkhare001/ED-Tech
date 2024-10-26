
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth"; // Authentication options
import dbConnect from '@/lib/mognodb'; // MongoDB connection
import { User } from "@/models/User"; // Your User model
import { Types } from 'mongoose';


export async function DELETE(request: Request) {
    await dbConnect();
  
    const session = await getServerSession(authOptions);
  
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 403 }
      );
    }
  
    try {
      // Parse the request body
      const body = await request.json();
      const { userId } = body;
  
      // Delete the user from MongoDB
      const result = await User.deleteOne({ _id: new Types.ObjectId(userId) });
  
      if (result.deletedCount === 0) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } catch (error) {
      console.error('Error deleting user:', error);
      return NextResponse.json(
        { message: "Error deleting user", error },
        { status: 500 }
      );
    }
  }