"use client";
import Image from "next/image";
import React from "react";
import Tilt from "react-parallax-tilt";
import certifiedcourseimg from "@/assets/certification.jpg";
import { FaFile, FaStar } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";

type Props = {
  course: {
    id: number;
    image: React.JSX.Element;
    title: string;
    price: number;
    author: string;
    reviewNumber: number;
    lessons: number;
    students: number;
  };
};

const CourseCard = ({ course }: Props) => {
  return (
    <Tilt>
      <div className="bg-white rounded-lg overflow-hidden cursor-pointer w-[350px]">
        <div>
          <Image
            src={certifiedcourseimg}
            alt={course.title}
            width={300}
            height={400}
            className="w-[350px] h-full"
          />
        </div>
        <div className="p-4">
          <h1 className="ml-auto relative z-[10] h-20 w-20 flex items-center text-xl font-bold justify-center flex-col mt-[-4rem] rounded-full bg-[#9e032a] text-white">
            ${course.price}
          </h1>
          <div className="lex items-center mt-5 space-x-4">
            <span className="text-lg text-black text-opacity-70 font-bold ml-2">
              {course.author}
            </span>
          </div>
          <h1 className="text-xl text-black font-bold mt-2">{course.title}</h1>
          <div className="flex mt-2 items-center space-x-2">
            <div className="flex justify-items-center">
              <FaStar className="w-4 h-4 text-yellow-600" />
              <FaStar className="w-4 h-4 text-yellow-600" />
              <FaStar className="w-4 h-4 text-yellow-600" />
              <FaStar className="w-4 h-4 text-yellow-600" />
              <FaStar className="w-4 h-4 text-yellow-600" />
            </div>
            <span className="text-base text-orange-800 font-semibold ">
              ({course.reviewNumber} Reviews)
            </span>
          </div>
          <div className="mt-6 mb-6 w-full h-[2px] bg-gray-500 opacity-15"></div>
          <div className="flex mb-8 items-center judtify-between">
            <div className="flex items-center space-x-2">
              <FaFile className="w-4 h-4 text-orange-600" />
              <p className="text-base font-semibold text-gray-800">
                {course.lessons} Lessons
              </p>
            </div>
            <div className="flex items-center space-x-2 ">
              <FaUserGroup className="w-4 h-4 text-orange-600 ml-[110px]" />
              <p className="text-base font-semibold text-gray-800">
                {course.students} Students
              </p>
            </div>
          </div>
        </div>
      </div>
    </Tilt>
  );
};

export default CourseCard;
