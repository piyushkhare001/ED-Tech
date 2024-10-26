import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mognodb'; // Adjust the path as necessary
import User from '../../../../models/User'; // Import your User model

export async function GET(request: Request, { params }: { params: { id: string } }) {
  // Connect to the database
  await dbConnect();

  try {
    const user = await User.findById(params.id); // Fetch the user by ID
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    console.log( "user details find from getById  ", user )
    return NextResponse.json(user, { status: 200 });
  
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}


























// import { NextApiRequest, NextApiResponse } from 'next';
// import dbConnect from '@/lib/mognodb'; 
// import User from '@/models/User'; 

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const {
//     method,
//     query: { id },
//   } = req;

  
//   await dbConnect();

//   switch (method) {
//     case 'GET':
//       try {
//         const user = await User.findById(id); 
//         if (!user) {
//           return res.status(404).json({ message: 'User not found' });
//         }
//         res.status(200).json(user);
//       } catch (error) {
//         res.status(500).json({ message: 'Internal server error' });
//       }
//       break;



//     default:
//       res.setHeader('Allow', ['GET']);
//       res.status(405).end(`Method ${method} Not Allowed`);
//       break;
//   }
// }
