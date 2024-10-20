"use client";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import Sidebar from "../Sidebar/page";
import Image from "next/image";
import nextjscourse from "src/assets/nextjscourse.png"
import tsximg from "src/assets/tsximg.jpg";


interface Course {
  id: number;
  title: string;
  imageUrl: string | JSX.Element;
  description: string;
  createdDate: string;
  duration: string;
  price: string;
  status: string;
}

const MyCourses = () => {
  const courses: Course[] = [
    {
      id: 1,
      title: "TypeScript",
      imageUrl: (
            <Image
                src={tsximg}
                alt="TSX Logo"
                className="lg:w-[180px] lg:h-[150px] rounded-lg mr-4 justify-between ml-10"
            />

      ),
      description: "typescript cxourse",
      createdDate: "August 23, 2024 | 1:51 AM",
      duration: "2hr 30min",
      price: "₹1559",
      status: "Published",
    },
    {
      id: 2,
      title: "Next.js",
      imageUrl: (
            <Image
                src={nextjscourse}
                alt="Nextjs Logo"
                className="lg:w-[180px] lg:h-[150px] rounded-lg mr-4 justify-between ml-10 "
            />
       ),
      description: "web dev",
      createdDate: "May 9, 2024 | 11:54 AM",
      duration: "2hr 30min",
      price: "₹1999",
      status: "Published",
    },
  ];

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-900 text-white p-6">
        <h1 className="text-3xl font-semibold mb-6">My Courses</h1>
        <div className="space-y-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex justify-between items-center bg-gray-800 p-4 rounded-lg sm:h-[350px] lg:h-[220px]"
            >
              {/* Course Info */}
              <div className="lg:flex items-center ">
                {course.imageUrl}
            
                <div>
                  <h3 className="text-xl font-semibold text-center ml-16 lg:-ml-[155px] ">{course.title}</h3>
                  <p className="text-md text-gray-400 mt-4">{course.description}</p>
                  <p className="text-md text-gray-400 mt-3">Created: {course.createdDate}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-sm bg-yellow-500 text-black px-2 py-1 rounded-lg mt-4">
                      {course.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Course Metadata */}
              <div className="lg:flex items-center space-x-8">
                <div className="text-right">
                  <p className="text-sm mt-8 lg:mt-1">{course.duration}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm mt-2 mb-2 lg:block ">{course.price}</p>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 sm:-mb-16 lg:-mt-16">
                  <button className="text-gray-400 hover:text-yellow-400">
                    <PencilIcon className="w-6 h-6 " />
                  </button>
                  <button className="text-gray-400 hover:text-red-400">
                    <TrashIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
