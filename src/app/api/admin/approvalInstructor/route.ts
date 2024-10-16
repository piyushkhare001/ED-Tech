import { NextResponse } from "next/server";
import User from "../../../../models/User"; // Assuming your User schema is inside models/User.ts
import connectToMongoDB from "@/lib/mognodb";

connectToMongoDB();
// verified == false - unverified (or) true - verified (or) null - rejected (or) undifiend - not a teacher
export async function POST(req: Request) {
    try {
      const {id,verified} = await req.json();
  
      const updatedInstructor = await User.findByIdAndUpdate(id, {$set:{verified}});
  
      if (!updatedInstructor) {
        return NextResponse.json({ message: "Instructor not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Instructor updated successfully", updatedInstructor });
    } catch (error) {
      return NextResponse.json({ message: "Error updating instructor", error }, { status: 500 });
    }
}
export async function GET(req: Request, { params }: { params: { verified?: boolean } }) {
  try {
    const { verified=false } = params;
    const Instructors = await User.find({role:'teacher',verified});

    if (!Instructors || Instructors.length === 0) {
      return NextResponse.json({ message: "No Instructor found"}, { status: 200 });
    }

    return NextResponse.json({ message: "Instructor found successfully", Instructors });
  } catch (error) {
    return NextResponse.json({ message: "Error finding instructor", error }, { status: 500 });
  }
}