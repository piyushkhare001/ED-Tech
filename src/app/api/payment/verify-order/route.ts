
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "../../../../lib/mognodb"
import User from "@/models/User";
import { Course } from '../../../../models/Course';
import Purchase from "../../../../models/Purchase";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../lib/auth";
import mailSender from '@/lib/utility/mailSender';
import paymentCompletedReceiptTemplate from '@/email/templates/paymentCompletedTemplate';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId, amount } = await req.json();
    
    const userId = session.user.id;
    const buyer = await User.findById(userId);
    const course = await Course.findById(courseId);
   console.log(amount)

   
    if (!buyer || !course) {
      return NextResponse.json({ success: false, message: "User or Course not found" }, { status: 404 });
    }
   
    // Verify payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_ID || 'fallbackSecret')
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ success: false, message: "Payment verification failed" }, { status: 400 });
    }

    const isAlreadyEnrolled = buyer.courses.some(c => c.courseId.toString() === courseId);
    if (isAlreadyEnrolled) {
      return NextResponse.json({ success: false, message: "User already enrolled in this course" }, { status: 400 });
    }
      
    // Check if the user already enrolled in the course

     if (!isAlreadyEnrolled){
    if (!buyer.courses.some(c => c.courseId.toString() === courseId)) {
      buyer.courses.push({
        courseId: courseId,
        completedContent: [], // Initialize as empty or provide any initial content
        progressPercentage: 0, // Initialize to 0 or your desired value
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await buyer.save();
    }
  }
    
    // Record the purchase
    const newPurchase = await Purchase.create({
      buyerId: buyer?._id,
      courseId: course?._id,
      purchaseDate: new Date(),
      paymentId: razorpay_payment_id,
      // studentPartnerId : ,
      finalPrice: amount


    });
 console.log(newPurchase)
   // Send email receipt
    await mailSender({
      email: buyer?.email,
      title: `Payment Successful`,
      body: paymentCompletedReceiptTemplate(course.title,  razorpay_payment_id, new Date().toISOString())
    });

    return NextResponse.json({ success: true, message: 'Payment verified, course added to user profile.', enrolledCourses: buyer.courses });

  } catch (error :any) {
    console.error("Error verifying payment:", error);
    return NextResponse.json({ error: "Payment verification failed", details: error.message }, { status: 500 });
  }
}
