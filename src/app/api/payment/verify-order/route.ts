// // File: /pages/api/verify-payment.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// //import Razorpay from 'razorpay';
// import crypto from 'crypto';

// type Data = {
//   message?: string;
//   error?: string;
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
//   if (req.method === 'POST') {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//       return res.status(400).json({ error: 'Missing required fields for verification' });
//     }

//     try {
//       // Create HMAC and verify signature
//       const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET as string);
//       hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
//       const generatedSignature = hmac.digest('hex');

//       if (generatedSignature === razorpay_signature) {
//         // Payment verified successfully
//         return res.status(200).json({ message: 'Payment verified successfully!' });
//       } else {
//         // Verification failed
//         return res.status(400).json({ error: 'Payment verification failed!' });
//       }
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ error: 'Error verifying payment' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// src/app/api/payment/verify-payment/route.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import connectToDatabase from '@/lib/mognodb'; // Adjust path based on your project structure
import { ObjectId } from 'mongodb';

export async function POST(req: Request) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courses, userId }: 
  { 
    razorpay_order_id: string; 
    razorpay_payment_id: string; 
    razorpay_signature: string; 
    courses: string[]; 
    userId: string; 
  } = await req.json();

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
    return NextResponse.json(
      { success: false, message: "Payment verification failed." },
      { status: 400 }
    );
  }

  // Create the body for signature validation
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  // Generate expected signature using Razorpay secret key
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_SECRET_ID as string)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature === razorpay_signature) {
    // If payment is verified, connect to the database
    const { db } : any = await connectToDatabase();

    // Update the user's document, adding the course IDs to their 'courses' array
    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $addToSet: { courses: { $each: courses.map(courseId => new ObjectId(courseId)) } } } // Ensure no duplicate courses
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ success: false, message: "Failed to update user with courses." }, { status: 400 });
    }

    // Payment verified and courses added successfully
    return NextResponse.json({ success: true, message: "Payment verified and courses updated." });
  }

  // If signature doesn't match, payment verification failed
  return NextResponse.json(
    { success: false, message: "Payment verification failed." },
    { status: 400 }
  );
}
