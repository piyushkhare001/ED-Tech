import React from "react";

import certifiedcourseimg from "@/assets/certification.jpg";
import Image from "next/image";
import CourseCard from "../CourseCard/page";

const courseData = [
  {
    id: 1,
    image: (
      <Image
        src={certifiedcourseimg}
        alt="Pic"
        width={50}
        height={20}
        className="w-[70px] h-[65px] rounded-full"
      />
    ),
    title: "Introduction to Java",
    price: 499,
    author: "ABC",
    reviewNumber: 200,
    lessons: 5,
    students: 50,
  },
  {
    id: 2,
    image: (
      <Image
        src={certifiedcourseimg}
        alt="Pic"
        width={50}
        height={20}
        className="w-[70px] h-[65px] rounded-full"
      />
    ),
    title: "Introduction to Python",
    price: 499,
    author: "ABC",
    reviewNumber: 200,
    lessons: 5,
    students: 50,
  },
  {
    id: 3,
    image: (
      <Image
        src={certifiedcourseimg}
        alt="Pic"
        width={50}
        height={20}
        className="w-[70px] h-[65px] rounded-full"
      />
    ),
    title: "Introduction to React Native",
    price: 499,
    author: "ABC",
    reviewNumber: 200,
    lessons: 5,
    students: 50,
  },
  {
    id: 4,
    image: (
      <Image
        src={certifiedcourseimg}
        alt="Pic"
        width={50}
        height={20}
        className="w-[70px] h-[65px] rounded-full"
      />
    ),
    title: "Introduction to Nodejs",
    price: 499,
    author: "ABC",
    reviewNumber: 200,
    lessons: 5,
    students: 50,
  },
  {
    id: 5,
    image: (
      <Image
        src={certifiedcourseimg}
        alt="Pic"
        width={50}
        height={20}
        className="w-[70px] h-[65px] rounded-full"
      />
    ),
    title: "Introduction to MongoDB",
    price: 499,
    author: "ABC",
    reviewNumber: 200,
    lessons: 5,
    students: 50,
  },
  {
    id: 6,
    image: (
      <Image
        src={certifiedcourseimg}
        alt="Pic"
        width={50}
        height={20}
        className="w-[70px] h-[65px] rounded-full"
      />
    ),
    title: "Introduction to SQL",
    price: 499,
    author: "ABC",
    reviewNumber: 200,
    lessons: 5,
    students: 50,
  },
];

const CertifiedCourse = () => {
  return (
    <div className="bg-slate-800 pt-16 pb-12 relative">
      <div className="w-[80%] pt-8 pb-8 mx-auto">
        <h1 className="text-4xl md:text-5xl text-white/90 font-bold">
          Certified Courses
        </h1>
        <div className="md:mt-16 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-14 ml-14 lg:-ml-12">
          {courseData.map((course) => {
            return (
              <div key={course.id}>
                <CourseCard course={course} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CertifiedCourse;
