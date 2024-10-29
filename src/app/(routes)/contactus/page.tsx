"use client";
import Footer from '@/components/frontend/footer';
import NavBar from '@/components/frontend/Navbar';
import React from 'react'
import { FaBook } from "react-icons/fa";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";


const page = () => {
  return (
    <div>
     <NavBar/>
     <div className="flex flex-col items-center justify-center bg-gradient-to-r from-green-100 to-purple-100 py-12 p-10 sm:p-20">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
          Contact Us
        </h1>
        <div className="flex justify-center items-center space-x-3 mb-2">
          <span className="text-gray-500">Home</span>
          <span className="text-gray-400">-</span>
          <span className="text-gray-500 font-medium">Contact Us</span>
        </div>
      </div>

      {/* Icon and Graphics */}
      <div className="flex flex-col sm:flex-row items-center justify-center mt-10 space-y-6 sm:space-y-0 sm:space-x-8">
        {/* Dotted Circle Graphic */}
        <div className="flex-shrink-0">
          <div className="w-32 h-32 sm:w-40 sm:h-40 bg-green-200 rounded-full flex items-center justify-center">
            <FaBook className="text-4xl sm:text-5xl text-green-600" />
          </div>
        </div>

        {/* Lightbulb or Other Graphic */}
        <div className="flex-shrink-0">
          <div className="w-32 h-32 sm:w-40 sm:h-40 bg-red-100 rounded-full flex items-center justify-center">
            <FaBook className="text-4xl sm:text-5xl text-red-500" />
          </div>
        </div>
      </div>
    </div>
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">
          We're Always Eager to Hear From You!
        </h1>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className='lg:mr-32'>
          <h2 className="text-2xl font-semibold mb-6">Address</h2>
          <div className="mb-4 flex items-center space-x-4">
            <FaMapMarkerAlt className="text-teal-600 text-2xl -mt-3" />
            <p className="text-md text-gray-700 -mt-3">
              Near DAV Public School, Maurya Vihar Colony, Kumhrar, Patna, Bihar – 800026
            </p>
          </div>

          <h2 className="text-2xl font-semibold mb-6">Email</h2>
          <div className="mb-4 flex items-center space-x-4">
            <FaEnvelope className="text-teal-600 text-2xl -mt-3" />
            <p className="text-md text-gray-700 -mt-3">hr@desiznideaz.com</p>
          </div>

          <h2 className="text-2xl font-semibold mb-6">Phone</h2>
          <div className="mb-4 flex items-center space-x-4">
            <FaPhoneAlt className="text-teal-600 text-2xl -mt-3" />
            <p className="text-md text-gray-700 -mt-3">+91 9279556632</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>
          <form className="space-y-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Your name*
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Enter your name"
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Enter your email*
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>

            {/* Phone Input */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone number
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Message Input */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Your message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Enter your message"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
              >
                Submit Message
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
    <Footer/>
    </div>
  )
}

export default page