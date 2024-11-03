import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb"; // Adjust path as necessary
import Profile from "@/models/Profile"; // Adjust path as necessary

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const { dateOfBirth, gender, mobile, about, address, collageName } = await req.json();

    console.log("Received data:", {
      dateOfBirth,
      gender,
      mobile,
      about,
      address,
      collageName,
    });

    // Initialize filedToUpdate as an empty object
    let filedToUpdate: any = {};

    if (dateOfBirth) filedToUpdate.dateOfBirth = new Date(dateOfBirth);
    if (gender) filedToUpdate.gender = gender;
    if (mobile) filedToUpdate.mobile = mobile;
    if (about) filedToUpdate.about = about;
    if (address) filedToUpdate.address = address;
    if (collageName) filedToUpdate.collageName = collageName;

    const userId = params.id; // Adjust how you get the user ID, e.g., from query or request body
    console.log(" userId ", userId);

    const updatedProfile = await Profile.findByIdAndUpdate(
      userId,
      {
        $set: { ...filedToUpdate },
      },
      {
        new: true, // Return the updated document
        runValidators: true,
        upsert: true,
      }
    );

    if (!updatedProfile) {
      return NextResponse.json(
        { message: "Profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProfile, { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
