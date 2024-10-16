import { NextResponse } from "next/server";
import User from "../../../../models/User"; // Assuming your User schema is inside models/User.ts
import connectToMongoDB from "@/lib/mognodb";
import mailSender from "@/lib/utility/mailSender";
import instructorStatusTemplate from "@/email/templates/instructorApproval";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

connectToMongoDB();
// verified == false - unverified (or) true - verified (or) null - rejected (or) undifiend - not a teacher
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);


  if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 403 }
      ); 
    }

    try {
      const {id,verified,email,name} = await req.json();
      const updatedInstructor = await User.findByIdAndUpdate(id, {$set:{verified}});
        await mailSender({
          email:email,
          title:'You are approved by the Admin',
          body:instructorStatusTemplate(verified?'approved':'denied',name)
        })
      if (!updatedInstructor) {
        return NextResponse.json({ message: "Instructor not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Instructor updated successfully", updatedInstructor });
    } catch (error) {
      return NextResponse.json({ message: "Error updating instructor", error }, { status: 500 });
    }
}
export async function GET(req: Request, { params }: { params: { verified?: boolean } }) {
  const session = await getServerSession(authOptions);


  if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 403 }
      ); 
    }

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