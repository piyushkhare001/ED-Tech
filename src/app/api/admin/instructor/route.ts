import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "../../../../models/User"; // Assuming your User schema is inside models/User.ts
import connectToMongoDB from "@/lib/mongodb";
import { Types } from "mongoose";

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
    return NextResponse.json({
      message: "Instructor created successfully",
      instructor,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating instructor", error },
      { status: 500 }
    );
  }
}

// GET (READ)  instructors
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = params;
    if (data) {
      if (data.id) {
        const instructor = await User.findOne({
          _id: new Types.ObjectId(data.id),
          role: "teacher",
        });
        if (!instructor) {
          return NextResponse.json(
            { message: "Instructor not found" },
            { status: 404 }
          );
        }
        return NextResponse.json(instructor);
      }
    }
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status");
    const page = Number(searchParams.get("page")) || 1;
    const limit = 10;
    const filter: any = {};
    if (status && status !== "all") {
      filter.verified = status;
    }
    if (search) {
      filter.email = { $regex: search, $options: "i" }; // Case-insensitive search
    }

    // Query MongoDB with filters, pagination, and sorting
    const users = await User.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await User.countDocuments(filter); // Total number of documents
    return NextResponse.json({ data: users, total });

    // Find instructor by ID
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Error fetching instructor", error },
      { status: 500 }
    );
  }
}

// UPDATE an instructor by ID
export async function PATCH(req: Request) {
  try {
    const { id, action } = await req.json();

    // Fetch the current state of the user to apply conditional updates
    const instructor = await User.findById(id);
    if (!instructor) {
      return NextResponse.json(
        { message: "Instructor not found" },
        { status: 404 }
      );
    }

    // Initialize update object with other provided fields
    const updateData = { verified: action };

    // Handle verification status update based on current status and action
    if (action === "approve") {
      if (instructor.verified === "approved") {
        return NextResponse.json(
          {
            message:
              "Instructor is already approved. Use 'blocked' action if needed.",
          },
          { status: 400 }
        );
      }
      updateData.verified = "approved";
    } else if (action === "decline") {
      if (instructor.verified === "approved") {
        return NextResponse.json(
          {
            message:
              "Cannot decline an already approved instructor. Use 'blocked' action if needed.",
          },
          { status: 400 }
        );
      }
      updateData.verified = "declined";
    } else if (action === "block") {
      if (instructor.verified !== "approved") {
        return NextResponse.json(
          { message: "Only approved instructors can be blocked." },
          { status: 400 }
        );
      }
      updateData.verified = "blocked";
    }

    // Perform the update
    const updatedInstructor = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    return NextResponse.json({
      message: `Instructor ${action}d successfully`,
      updatedInstructor,
    },{status:201});
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating instructor", error },
      { status: 500 }
    );
  }
}

// DELETE an instructor by ID
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    const deletedInstructor = await User.findByIdAndDelete(id);

    if (!deletedInstructor) {
      return NextResponse.json(
        { message: "Instructor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Instructor deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting instructor", error },
      { status: 500 }
    );
  }
}
