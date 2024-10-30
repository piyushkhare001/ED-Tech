import { NextResponse } from "next/server";

import dbConnect from "@/lib/mongodb"; // Adjust the path as necessary
import Purchase from "@/models/Purchase"; // Import your User model

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Connect to the database
  await dbConnect();

  try {
    const user = await Purchase.findById({ buyerId: params.id }); // Fetch the user by ID
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    console.log("user details find from getById  ", user);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
