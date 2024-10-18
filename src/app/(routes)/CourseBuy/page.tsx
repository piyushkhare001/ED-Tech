import Image from "next/image";
import React from "react";
import nextjscourse from "@/assets/nextjscourse.png";

const CourseBuy = () => {
  return (
    <div className="bg-gray-800 text-white min-h-screen flex flex-col items-center">
      <div className="w-full max-w-lg p-10">
        <div className="flex flex-col items-center">
          <Image
            src={nextjscourse}
            alt="Nextjs Logo"
            className="w-[250px] h-[200px] mb-4"
          />
          <h1 className="text-4xl font-bold mb-2">Next.Js</h1>
          <p className="text-gray-400">Next.Js course</p>

          <div className="flex items-center my-4">
            <span className="text-yellow-400 text-lg">★★★★★</span>
            <span className="text-gray-400 ml-2">(0 reviews)</span>
            <span className="text-gray-400 ml-4">0 students enrolled</span>
          </div>

          <p className="text-gray-400">Created By ABCD</p>
          <p className="text-gray-400">
            Created at October 08, 2024 | 10:00 AM | English
          </p>
        </div>

        <div className="my-8">
          <p className="text-3xl font-semibold text-center">Rs. 1999</p>
          <button className="w-full mt-4 bg-yellow-500 text-gray-900 py-2 px-4 rounded-lg font-bold hover:bg-yellow-200">
            Buy Now
          </button>
          <button className="w-full mt-2 bg-gray-800 border border-gray-700 py-2 px-4 rounded-lg font-bold hover:bg-slate-400 hover:text-black">
            Add to Cart
          </button>
        </div>

        {/* Course Content */}
        <div className="border-t border-gray-800 pt-4">
          <h2 className="text-2xl font-semibold mb-4">What you will learn</h2>
          <p className="text-gray-400">Very beneficial</p>

          <div className="mt-6">
            <h3 className="text-xl font-bold">Course Content</h3>
            <p className="text-gray-400 mb-2">
              1 section(s) | 1 lecture(s) | 1m 54s total length
            </p>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">1</span>
                <span>1 lecture(s)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Author Information */}
        <div className="mt-8 flex items-center">
          <div className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold">
            AB
          </div>
          <p className="ml-4">ABCD</p>
        </div>
      </div>
    </div>
  );
};

export default CourseBuy;
