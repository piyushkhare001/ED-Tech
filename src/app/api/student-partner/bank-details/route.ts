import { NextRequest, NextResponse } from 'next/server';
import BankDetails from '@/models/BankDetails'; // Adjust the import path as needed
import StudentPartner from '@/models/StudentPartner'; // Assume this model exists
import connectToMongoDB from '@/lib/mognodb';




export async function PUT(req: NextRequest) {
  try {
    await connectToMongoDB();

    const body = await req.json();
    const { email, ...bankDetails } = body;

    // Find the StudentPartner by email
    const studentPartner = await StudentPartner.findOne({ email });
    if (!studentPartner) {
      return NextResponse.json({ error: 'Student partner not found' }, { status: 404 });
    }

    // Check if bank details already exist for this student partner
    let existingBankDetails = await BankDetails.findOne({ studentPartnerId: studentPartner._id });

    if (existingBankDetails) {
      // Update existing bank details
      existingBankDetails = await BankDetails.findOneAndUpdate(
        { studentPartnerId: studentPartner._id },
        { ...bankDetails },
        { new: true, runValidators: true }
      );
    } else {
      // Create new bank details
      existingBankDetails = await BankDetails.create({
        studentPartnerId: studentPartner._id,
        ...bankDetails
      });
    }

    return NextResponse.json({
      message: 'Bank details updated successfully',
      data: existingBankDetails
    }, { status: 200 });

  } catch (error) {
    console.error('Error updating bank details:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}