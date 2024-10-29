import { NextResponse } from 'next/server';
import { instance } from '../../../config/razorpay';
import { getServerSession } from "next-auth/next"; 
import { authOptions } from "../../../../lib/auth";
import User from "@/models/User";

console.log("Razorpay Key ID:", process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  try {
    // Check if the user is authenticated
    if (!session) {
      return NextResponse.json(
        { success: false, message: "User not authenticated" },
        { status: 401 }
      );
    }

    const { courseId, amount } = await req.json();
    const userId = session.user.id;
    
    // Fetch the user from the database
    const buyer = await User.findById(userId);
    
    // Check if the buyer and course details are valid
    if (!buyer) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    if (!courseId || !amount || amount <= 0) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid course ID and amount" },
        { status: 400 }
      );
    }

    // Check if the user is already enrolled in the course
    const isAlreadyEnrolled = buyer.courses.some(c => c.courseId.toString() === courseId);
    if (isAlreadyEnrolled) {
      console.log("User is already enrolled in this course");
      return NextResponse.json(
        { success: false, message: "User is already enrolled in this course" },
        { status: 400 }
      );
    }

    // Create Razorpay order if the user is not already enrolled
    const order = await instance.orders.create({
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `receipt_order_${new Date().getTime()}`,
    });

    return NextResponse.json(order);
  
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { error: "Failed to create Razorpay order" },
      { status: 500 }
    );
  }
}
