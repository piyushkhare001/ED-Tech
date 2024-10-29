"use client";

import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/logo.jpeg";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
 const session = useSession()
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
 const router = useRouter()
  return (
    <nav className="bg-white shadow-md h-[80px]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex gap-3">
              <Image src={logo} alt='Logo' width={72} height={20} className="-ml-8"/>
              <h1 className="text-3xl font-bold text-gray-800 pt-5">Desiznideaz</h1>
            </div>
    
          </div>

          {/* Menu Items */}
          <div className="hidden md:flex space-x-6">
            <a href="/" className="text-gray-700 hover:text-blue-600 font-medium text-lg pt-5">
              Home
            </a>
            <a href="/aboutus" className="text-gray-700 hover:text-blue-600 font-medium text-lg pt-5">
              About
            </a>
            <a href="/our-courses" className="text-gray-700 hover:text-blue-600 font-medium text-lg pt-5">
              Courses
            </a>
            <a href="/certificate" className="text-gray-700 hover:text-blue-600 font-medium text-lg pt-5">
              Certificate
            </a>
            <a href="/contactus" className="text-gray-700 hover:text-blue-600 font-medium text-lg pt-5">
              Contact Us
            </a>
          </div>

          {/* Login/Register */}
          {  
    (session?.data?.user )? (<>
     <div className="hidden md:flex pt-3 -mr-10">
              <button onClick={() => {router.push('/dashboard')}} className=" bg-[#1cb69d] text-white rounded-md w-[160px] h-[55px] font-medium text-xl">
                Dashboard
              </button>
          </div>
    
    </>) :

         ( <div className="hidden md:flex pt-3 -mr-10">
              <button onClick={() => {router.push('/signup')}} className=" bg-[#1cb69d] text-white rounded-md w-[160px] h-[55px] font-medium text-xl">
                  Login/Register
              </button>
          </div>
         )
}
          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <a href="/" className="block py-2 px-4 text-gray-700 hover:bg-gray-100">
              Home
            </a>
            <a href="/about" className="block py-2 px-4 text-gray-700 hover:bg-gray-100">
              About
            </a>
            <a href="/courses" className="block py-2 px-4 text-gray-700 hover:bg-gray-100">
              Courses
            </a>
            <a href="/certificate" className="block py-2 px-4 text-gray-700 hover:bg-gray-100">
              Certificate
            </a>
            <a href="/contact" className="block py-2 px-4 text-gray-700 hover:bg-gray-100">
              Contact Us
            </a>
            <a
              href="/login"
              className="block py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Login/Register
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;