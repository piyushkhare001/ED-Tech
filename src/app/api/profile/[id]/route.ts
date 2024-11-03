import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb"; // Adjust path as necessary
import Profile from "@/models/Profile"; // Adjust path as necessary

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const userId = params.id;

    // Fetch the profile based on user ID
    const profile = await Profile.findById(userId);

    if (!profile) {
      return NextResponse.json(
        { message: "Profile not found" },
        { status: 404 }
      );
    }

    // Return the profile data
    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
