import connectToMongoDB from "@/lib/mongodb";
import StudentPartner from "@/models/StudentPartner";
import { QNA } from "@/models/QNA";
import { Coupon } from "@/models/Coupon";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.json();

    if (!formData.email || !formData.name) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }

    await connectToMongoDB();

    // Check if email exists
    const existingPartner = await StudentPartner.findOne({
      email: formData.email,
    });
    if (existingPartner) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already registered",
          status: existingPartner.adminApproval,
        },
        { status: 409 }
      );
    }

    // Generate password
    const year = new Date().getFullYear().toString().slice(-2);
    const randomString = Math.random()
      .toString(36)
      .substring(2, 4)
      .toUpperCase();
    const namePart = formData.name.toUpperCase().trim().slice(0, 4);

    const password = `${namePart}${randomString}${year}`;
    console.log(password);
    // Generate coupon code
    const yr = new Date().getFullYear();
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
    const couponCode = `DSP${formData.name
      .trim()
      .toUpperCase()
      .replace(/\s+/g, "")}${yr}${randomNumber}`;

    // Create new coupon
    const coupon = await Coupon.create({
      code: couponCode,
      validFrom: new Date(),
      validUntil: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      ),
      usageLimit: 10,
      usageCount: 0,
    });
    // Create new student partner
    const studentPartner = await StudentPartner.create({
      email: formData.email,
      password,
      name: formData.name,
      collegeName: formData.collegeName,
      contactNumber: formData.contactNumber,
      educationQualification: formData.education,
      branch: formData.branch,
      yearOrsemester: formData.yearSemester,
      adminApproval: "Pending",
      coupon: coupon._id,
      totBalance: 0,
    });

    // Organize QNA data
    const qnaData = {
      studentPartnerId: studentPartner._id,
      sections: formData.sections.map((section: any) => ({
        sectionId: section.id,
        title: section.title,
        questions: section.fields.map((field: any) => ({
          questionId: field.name,
          question: field.label,
          answer: formData[field.name] || "",
        })),
      })),
    };

    // Create QNA record
    await QNA.create(qnaData);

    return NextResponse.json(
      {
        success: true,
        message: "Student Partner registration successful",
        data: {
          studentPartner,
          couponCode,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in student partner signup:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
