import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "../../../../models/User"; // Assuming your User schema is inside models/User.ts
import connectToMongoDB from "@/lib/mognodb";

// Connect to the database
connectToMongoDB();

// CREATE an instructor
export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    const instructor = new User({
      name,
      email,
      password: hashedPassword,
      role: "teacher", // Setting role as teacher (instructor)
      
    });

    await instructor.save();
    return NextResponse.json({ message: "Instructor created successfully", instructor });
  } catch (error) {
    return NextResponse.json({ message: "Error creating instructor", error }, { status: 500 });
  }
}

// GET (READ)  instructors
export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
  
      // Find instructor by ID
      const instructor = await User.findOne({ _id: id, role: "teacher" });
  
      if (!instructor) {
        return NextResponse.json({ message: "Instructor not found" }, { status: 404 });
      }
  
      return NextResponse.json(instructor);
    } catch (error) {
      return NextResponse.json({ message: "Error fetching instructor", error }, { status: 500 });
    }
  }

// UPDATE an instructor by ID
export async function PATCH(req: Request) {
  try {
    const {id,data} = await req.json();

    const updatedInstructor = await User.findByIdAndUpdate(id, {$set:{...data}});

    if (!updatedInstructor) {
      return NextResponse.json({ message: "Instructor not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Instructor updated successfully", updatedInstructor });
  } catch (error) {
    return NextResponse.json({ message: "Error updating instructor", error }, { status: 500 });
  }
}

// DELETE an instructor by ID
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    const deletedInstructor = await User.findByIdAndDelete(id);

    if (!deletedInstructor) {
      return NextResponse.json({ message: "Instructor not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Instructor deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting instructor", error }, { status: 500 });
  }
}
