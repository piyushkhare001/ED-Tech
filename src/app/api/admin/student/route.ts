import { NextResponse } from "next/server";
import User from "../../../../models/User"; // Assuming your User schema is inside models/User.ts
import connectToMongoDB from "@/lib/mognodb";

// Connect to the database
connectToMongoDB();

export async function DELETE(req: Request) {
    try {
      const { id } = await req.json();
  
      const deletedInstructor = await User.findByIdAndDelete(id);
  
      if (!deletedInstructor) {
        return NextResponse.json({ message: "Student not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Student deleted successfully" });
    } catch (error) {
      return NextResponse.json({ message: "Error deleting instructor", error }, { status: 500 });
    }
  }