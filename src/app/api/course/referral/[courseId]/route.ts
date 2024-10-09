import { NextRequest, NextResponse } from "next/server";
import Referral from "@/models/Referal";
import connectToMongoDB from "@/lib/mognodb";

export async function POST(
  req: NextRequest,
  res: NextResponse,
  params: { params: { courseId: string } }
) {
  await connectToMongoDB();
  const { courseId } = params.params;
  if (!course) {
    return NextResponse.json({ message: "Course not found" }, { status: 404 });
  }
}
