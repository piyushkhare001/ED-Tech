import { NextRequest, NextResponse } from 'next/server';
import { Referral } from '@/models/Referal';
import { User } from '@/models/User'; 
import { Coupon } from '@/models/Coupon'; 
import { Course } from '@/models/Course'; 
import connectToMongoDB from '@/lib/mognodb';



export async function POST(req: NextRequest) {
  try {
    await connectToMongoDB();

    const body = await req.json();
    const { userEmail, courseId, paymentStatus, couponCode } = body;

    // Find the User by email
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Find the Course by ID
    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Find the Coupon by code
    const coupon = await Coupon.findOne({ code: couponCode });
    if (!coupon) {
      return NextResponse.json({ error: 'Coupon not found' }, { status: 404 });
    }

    // Check if a referral already exists for this user and course
    let referral = await Referral.findOne({ takenBy: user._id, course: course._id });

    if (referral) {
      // Update existing referral
      referral = await Referral.findOneAndUpdate(
        { takenBy: user._id, course: course._id },
        {
          couponUsed: coupon._id,
          paymentStatus: paymentStatus as "Completed" | "Pending",
        },
        { new: true, runValidators: true }
      );
    } else {
      // Create new referral
      referral = await Referral.create({
        takenBy: user._id,
        couponUsed: coupon._id,
        referedBy: coupon.createdBy, // Assuming the coupon has a createdBy field
        paymentStatus: paymentStatus as "Completed" | "Pending",
        course: course._id,
      });
    }

    return NextResponse.json({
      message: 'Referral created/updated successfully',
      data: referral
    }, { status: 200 });

  } catch (error) {
    console.error('Error processing referral:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}