"use client";
import React, { useState } from "react";
import Sidebar from "../Sidebar/page";

const AddCourse = () => {
    const [coursePrice, setCoursePrice] = useState("");
    const [courseCategory, setCourseCategory] = useState("");
    const [tags, setTags] = useState("");
    const [thumbnail, setThumbnail] = useState<File | null>(null);

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
          setThumbnail(e.target.files[0]);
        }
    };
 console.log(thumbnail)
  return (
    <div className="min-h-screen flex bg-gray-900">
      {/* Sidebar */}
        <Sidebar/>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="container mx-auto">
          {/* Page Title */}
          <h1 className="text-3xl font-semibold text-white mb-8">Add Course</h1>

          {/* Progress Bar */}
          <div className="flex items-center mb-8 space-x-4">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white">1</div>
              <span className="absolute top-12 left-1/2 transform -translate-x-1/2 text-gray-300">Course Information</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-700"></div>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white">2</div>
              <span className="absolute top-12 left-1/2 transform -translate-x-1/2 text-gray-400">Course Builder</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-700"></div>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white">3</div>
              <span className="absolute top-12 left-1/2 transform -translate-x-1/2 text-gray-400">Publish</span>
            </div>
          </div>

          {/* Course Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* Course Title */}
              <div className="pt-12">
                <label className="block text-gray-300 mb-2">Course Title <span className="text-red-500"> *</span></label>
                <input
                  type="text"
                  placeholder="Enter Course Title"
                  className="w-full p-3 rounded-lg bg-gray-800 text-gray-300 border border-gray-700 focus:border-yellow-500 focus:outline-none"
                />
              </div>

              {/* Course Short Description */}
              <div>
                <label className="block text-gray-300 mb-2">Course Short Description <span className="text-red-500"> *</span></label>
                <textarea
                  placeholder="Enter Description"
                  className="w-full p-3 rounded-lg bg-gray-800 text-gray-300 border border-gray-700 focus:border-yellow-500 focus:outline-none"
                  rows={4}
                />
              </div>
              {/* Course Price */}
            <div className="mb-4">
                <label className="block text-gray-300 mb-2" htmlFor="coursePrice">
                    Course Price <span className="text-red-500">*</span>
                </label>
                <input
                id="coursePrice"
                type="text"
                value={coursePrice}
                onChange={(e) => setCoursePrice(e.target.value)}
                placeholder="Enter Course Price"
                className="w-full p-3 rounded-lg bg-gray-800 text-gray-300 border border-gray-700 focus:border-yellow-500 focus:outline-none"
                />
            </div>
            {/* Course Category */}
            <div className="mb-4">
                <label className="block text-gray-300 mb-2" htmlFor="courseCategory">
                    Course Category <span className="text-red-500">*</span>
                </label>
                <select
                    id="courseCategory"
                    value={courseCategory}
                    onChange={(e) => setCourseCategory(e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-800 text-gray-300 border border-gray-700 focus:border-yellow-500 focus:outline-none"
                >
                <option value="">Choose a Category</option>
                <option value="technology">Technology</option>
                <option value="business">Business</option>
                <option value="design">Design</option>
                {/* Add more options as needed */}
                </select>
            </div>
            {/* Tags */}
            <div className="mb-4">
                <label className="block text-gray-300 mb-2" htmlFor="tags">
                    Tags <span className="text-red-500">*</span>
                </label>
                <input
                id="tags"
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Enter Tags and press Enter"
                className="w-full p-3 rounded-lg bg-gray-800 text-gray-300 border border-gray-700 focus:border-yellow-500 focus:outline-none"
                />
            </div>
            {/* Course Thumbnail */}
            <div className="mb-4">
                <label className="block text-gray-300 mb-2" htmlFor="thumbnail">
                    Course Thumbnail <span className="text-red-500">*</span>
                </label>
                <input
                id="thumbnail"
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="w-full p-3 rounded-lg bg-gray-800 text-gray-300 border border-gray-700 focus:border-yellow-500 focus:outline-none"
                />
            </div>
            </div>

            {/* Course Upload Tips */}
            <div className="bg-gray-800 p-6 rounded-lg mt-10">
              <h3 className="text-white text-lg font-semibold mb-4">Course Upload Tips</h3>
              <ul className="text-gray-400 space-y-2">
                <li>Set the Course Price option or make it free.</li>
                <li>Standard size for the course thumbnail is 1024×576.</li>
                <li>Video section controls the course overview video.</li>
                <li>Course Builder is where you create & organize a course.</li>
                <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                <li>Information from the Additional Data section shows up on the course single page.</li>
                <li>Make Announcements to notify any important updates.</li>
                <li>Notes to all enrolled students at once.</li>
              </ul>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-end mt-8 space-x-4">
            <button className="py-2 px-6 rounded-lg bg-gray-700 text-white hover:bg-gray-600">Back</button>
            <button className="py-2 px-6 rounded-lg bg-yellow-500 text-black hover:bg-yellow-600">Next</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddCourse;
