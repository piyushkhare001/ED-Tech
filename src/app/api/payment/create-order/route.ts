
import { NextResponse } from 'next/server';

import { instance } from '../../../config/razorpay';

console.log("Razorpay Key ID:", process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);


export async function POST(req: Request) {
  try {
    const { course }: { course: string[] } = await req.json();
    const { amount } = await req.json();
    console.log("Creating order with amount:", amount);

      if (!course || course.length === 0) {
    return NextResponse.json(
      { success: false, message: "Please provide course IDs." },
      { status: 400 }
    );
  }

    const order = await instance.orders.create({
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_order_${new Date().getTime()}`,
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json({ error: "Failed to create Razorpay order" }, { status: 500 });
  }
}

