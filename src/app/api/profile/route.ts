import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth"; // Authentication options
import connectToMongoDB from '@/lib/mognodb'; // MongoDB connection
import {User} from "../../../models/User"; // Your Course model
import {Types} from 'mongoose'



export async function GET(request: Request) {
    await connectToMongoDB();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized access" },
      { status: 403 }
    );
  }

  try {
    const user = await User.findOne(
        { _id: new Types.ObjectId(session.user.id) },
      );

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating user", error },
      { status: 500 }
    );
  }
}
export async function PUT(request: Request) {
    await connectToMongoDB();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized access" },
      { status: 403 }
    );
  }

  // Parse the request body
  const body = await request.json();
  const { userId, updatedData } = body;

  try {
    const updatedUser = await User.updateOne(
        { _id: new Types.ObjectId(userId) },
        { $set: updatedData }
      );

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating user", error },
      { status: 500 }
    );
  }
}
export async function DELETE(request: Request) {
    await connectToMongoDB();

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized access" },
      { status: 403 }
    );
  }

  // Parse the request body
  const body = await request.json();
  const { userId } = body;

  try {
    // Assuming `deleteUser` is a function to delete the user from MongoDB
    const result = await User.deleteOne({ _id: new Types.ObjectId(userId) })

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting user", error },
      { status: 500 }
    );
  }
}
