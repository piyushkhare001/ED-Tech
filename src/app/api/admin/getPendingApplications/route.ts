
import dbConnect from "../../../../lib/mognodb"; 
import StudentPartner from "@/models/StudentPartner";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"; // To get session
import { authOptions } from "../../../../lib/auth";



export async function GET() {
  try {
    const session = await getServerSession(authOptions);


    if (!session || session.user.role !== "admin") {
        return NextResponse.json(
          { message: "Unauthorized access" },
          { status: 403 }
        ); 
      }
    await dbConnect();
    const applications = await StudentPartner.find({ adminApproval: "Pending" });

    return NextResponse.json({ applications }, { status: 200 });
  } catch (error) {
    console.error("Error fetching pending applications:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch applications." }, { status: 500 });
  }
}
