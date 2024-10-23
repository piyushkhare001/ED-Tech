import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/mognodb";
import { Lecture } from "@/models/Lecture";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../lib/auth";
import { Types } from "mongoose";

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "teacher") {
    return NextResponse.json(
      { error: "Unauthorized: No session provided" },
      { status: 401 }
    );
  }

  await dbConnect();

  const {id} = await req.json();

  if (!id) {
    return NextResponse.json({ message: "Missing required fields" },{status:400});
  }

  try {
    const lecture = await Lecture.findById(new Types.ObjectId(id));
    return NextResponse.json({
      message: "Lecture loaded successfully",
      lecture,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error find lecture", error: err },
      { status: 500 }
    );
  }
}