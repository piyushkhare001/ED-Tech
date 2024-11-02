import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mognodb'; // Adjust the path as necessary
import Purchase from '@/models/Purchase'; // Import your Purchase model

export async function GET(request: Request, { params }: { params: { id: string } }) {
  // Connect to the database
  await dbConnect();

  try {
    // Fetch purchases by buyerId
    const purchases = await Purchase.find({ buyerId: params.id }).populate('courseId studentPartnerId'); // Populate to get full details

    if (!purchases.length) {
      return NextResponse.json({ message: 'No purchases found for this user.' }, { status: 404 });
    }

    console.log("User purchases found: ", purchases);
    return NextResponse.json(purchases, { status: 200 });

  } catch (error) {
    console.error("Error fetching purchases: ", error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
