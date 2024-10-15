// import { NextResponse } from 'next/server';
// import crypto from 'crypto';
// import dbConnect from "../../../../lib/mognodb"
// import User from '@/models/User';
// import {Course} from '../../../../models/Course';
// import Purchase from '../../../../models/Purchase';
// import {Coupon} from '../../../..//models/Coupon';
// import StudentPartner from '../../../../models/StudentPartner';
// import { notifySuperAdmin } from '../../../utils/notifySuperAdmin';
// import { getServerSession } from "next-auth/next"; 
// import { authOptions } from "../../../../lib/auth";


// export async function POST(req: Request) {
//   try {
//     const session = await getServerSession(authOptions);
//     const { order_id, payment_id, signature, courseId, couponCode, amount } = await req.json();
    
//     await dbConnect();

  
//     const userId = session?.user?.id
//     const buyer = await User.findById(userId);
    
//     if (!buyer) {
//       return NextResponse.json({ success: false, message: "Invalid user" }, { status: 400 });
//     }

   
//     const course = await Course.findById(courseId);
//     if (!course) {
//       return NextResponse.json({ success: false, message: "Course not found" }, { status: 404 });
//     }

 
//     const coupon = await Coupon.findOne({ code: couponCode });
//     if (!coupon) {
//       return NextResponse.json({ success: false, message: "Invalid coupon code" }, { status: 400 });
//     }

//     const studentPartner = await StudentPartner.findOne({ couponCode: couponCode });
//     if (!studentPartner) {
//       return NextResponse.json({ success: false, message: "Coupon not associated with a student partner" }, { status: 400 });
//     }

  
//     const body = order_id + "|" + payment_id;
//     const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_ID)
//       .update(body.toString())
//       .digest('hex');

//     if (expectedSignature !== signature) {
//       return NextResponse.json({ success: false, message: "Payment verification failed" }, { status: 400 });
//     }


//     if (!buyer.courses.includes(courseId)) {
//       buyer.courses.push(courseId);
//       await buyer.save();
//     }

    
//     const discountedPrice = amount;  
//     const newPurchase = await Purchase.create({
//       buyerId: buyer._id,
//       courseId: course._id,
//       studentPartnerId: studentPartner._id,
//       finalPrice: discountedPrice,
//       purchaseDate: new Date(),
//       paymentId: payment_id,
//     });


//      notifySuperAdmin(newPurchase , courseId , studentPartner ,buyer);

//     return NextResponse.json({
//       success: true,
//       message: 'Payment verified, course added to user profile.',
//       enrolledCourses: buyer.courses,
//     });
//   } catch (error) {
//     console.error("Error verifying payment:", error);
//     return NextResponse.json({ error: "Payment verification failed" }, { status: 500 });
//   }
// }
