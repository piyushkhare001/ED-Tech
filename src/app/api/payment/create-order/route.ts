import { NextResponse } from 'next/server';
import { instance } from '../../../config/razorpay';
//import mailSender from '@/lib/utility/mailSender';
// import { getServerSession } from "next-auth/next"; 
// import { authOptions } from "../../../../lib/auth";

console.log("Razorpay Key ID:", process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);

export async function POST(req: Request) {
  //const session = await getServerSession(authOptions);
  //const email: string | null = session?.user?.email || null;
  
  try {
    // Call req.json() only once
    const {  amount } = await req.json();
    const courseid = "670bdc7781def95e58eb0fa7";
    console.log("Creating order with amount:", amount, "for courseId:", courseid);

    // Check for missing courseid or invalid amount
    if (!courseid || courseid.length === 0) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid course ID." },
        { status: 400 }
      );
    }

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid amount." },
        { status: 400 }
      );
    }

    // Create the Razorpay order
    const order = await instance.orders.create({
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `receipt_order_${new Date().getTime()}`,
    });

    // Remove mail sending logic for now (as it should be in verify-order after payment)
    // Mail can be sent after verification to avoid sending mail before confirming the payment
    
    return NextResponse.json(order);
    
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json({ error: "Failed to create Razorpay order" }, { status: 500 });
  }
}
