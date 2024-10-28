import { NextResponse } from "next/server";
import dbConnect from '@/lib/mognodb'; // MongoDB connection
import { User } from "@/models/User"; // Your User model
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function DELETE() {
  // Get the session to check if the user is authenticated
  const session = await getServerSession(authOptions);

  // If there is no session, return an unauthorized response
  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized access" },
      { status: 403 }
    );
  }

  // Get the user ID from the session
  const userId = session?.user?.id;

  // Connect to the database
  await dbConnect();

  try {
    // Attempt to delete the user by ID
    const result = await User.deleteOne({ _id: userId });

    // Check if a user was deleted
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
