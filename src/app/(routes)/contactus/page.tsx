"use client";

import Footer from '@/components/frontend/footer';
import NavBar from '@/components/frontend/Navbar';
import React, { useState } from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
//import { Toast } from '@radix-ui/react-toast';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    mobileNo: "",
    accountType: "",
  });
  const [responseMessage, setResponseMessage] : any = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage(null);

    try {
      const response = await fetch("/api/contactUs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setResponseMessage({ success: true, message: data.message });
        
       
      } else {
        setResponseMessage({ success: false, message: data.error || data.message });
     
      }
      
    } catch (error) {
      setResponseMessage({ success: false, message: "An error occurred. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <NavBar />
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
      </div>
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">
            We are Always Eager to Hear From You!
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your name*</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Enter your email*</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-700">Phone number</label>
                <input
                  type="text"
                  name="mobileNo"
                  id="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label htmlFor="accountType" className="block text-sm font-medium text-gray-700">
                  Account Type*
                </label>
                <select
                  id="accountType"
                  name="accountType"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  required
                  value={formData.accountType}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select your account type</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="studentPartner">Student Partner</option>
                  <option value="organization">Organization</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Enter your message"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Submit Message"}
                </button>
              </div>
            </form>

            {responseMessage && (
              <p className={`mt-4 text-center ${responseMessage.success ? "text-green-500" : "text-red-500"}`}>
                {responseMessage.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUsPage;
