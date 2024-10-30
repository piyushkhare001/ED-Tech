// // src/app/api/profile/update/[userId].ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import dbConnect from '@/lib/mognodb'; // Adjust import path as necessary
// import Profile from '@/models/Profile'; // Adjust import path as necessary

// export default async function POST(req: NextApiRequest, res: NextApiResponse) {
//     await dbConnect();

//     const { userId } = req.query;

//     if (req.method === 'POST') {
//         if (!userId || Array.isArray(userId)) {
//             return res.status(400).json({ message: 'Invalid user ID' });
//         }

//         try {
//             const updatedProfile = await Profile.findByIdAndUpdate(
//                 userId,
//                 { ...req.body },
//                 { new: true }
//             );

//             if (!updatedProfile) {
//                 return res.status(404).json({ message: 'Profile not found' });
//             }

//             res.status(200).json({ data: updatedProfile });
//         } catch (error) {
//             res.status(500).json({ message: 'Error updating profile', error });
//         }
//     } else {
//         res.setHeader('Allow', ['PUT']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }

// interface User {
//     dateOfBirth: string;
//     gender: string;
//     mobile: string;
//     about: string;
//     address: string;
//     collageName: string;
//   }

import dbConnect from "@/lib/mongodb";
import Profile from "@/models/Profile";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized access" },
      { status: 403 }
    );
  }

  const userId = session.user?.id;

  try {
    const { dateOfBirth, gender, mobile, about, address, collageName } =
      await req.json();

    if (
      !dateOfBirth &&
      !gender &&
      !about &&
      !address &&
      !mobile &&
      !collageName
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "At least one field is required.",
        },
        { status: 400 }
      );
    }

    await dbConnect();

    // Update or create profile directly
    const updatedProfile = await Profile.findByIdAndUpdate(
      userId,
      { dateOfBirth, gender, about, mobile, address, collageName },
      { new: true, upsert: true }
    );

    return NextResponse.json(
      {
        data: updatedProfile,
        success: true,
        message: "User profile updated",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while updating your profile",
      },
      { status: 500 }
    );
  }
}
