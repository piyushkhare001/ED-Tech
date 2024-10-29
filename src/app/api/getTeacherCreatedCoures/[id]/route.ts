import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/lib/mognodb';
import User from '@/models/User';




export async function GET(request: NextRequest, { params }: { params: { id: string } }) {

  await dbConnect();

  if (!params.id) {
    return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
  }

  try {
    const user = await User.findById(params.id)
 
    if (user?.role === "teacher"){
        if ( !user.courses || user.courses.length === 0) {
            return NextResponse.json({ message: 'No enrolled courses found' }, { status: 404 });
          }

          const myCourse = user.courses.map((course) => {
            const courseData = course.courseId as unknown  | undefined;
            if (!courseData) return null; // Optionally handle undefined courseData case
      

    } 

)

    return NextResponse.json(myCourse, { status: 200 });
  }
}catch(error : any){
    console.log(error)
}


}

