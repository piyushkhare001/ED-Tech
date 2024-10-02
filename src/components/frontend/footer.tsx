import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
        <div className="md:flex md:justify-between">
     
          <div className="md:w-1/4 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold text-teal-400">DESIZNIDEAZ</h2>
            <p className="mt-4 text-gray-400">
              Your one-stop solution for all study materials, courses, and e-learning tools. Learn better and faster!
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:w-1/4 mb-8 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <a href="/" className="hover:text-teal-400 transition-colors">Home</a>
              </li>
              <li className="mb-2">
                <a href="/courses" className="hover:text-teal-400 transition-colors">Courses</a>
              </li>
              <li className="mb-2">
                <a href="/about" className="hover:text-teal-400 transition-colors">About Us</a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="hover:text-teal-400 transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="md:w-1/4 mb-8 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Support</h3>
            <ul>
              <li className="mb-2">
                <a href="/faq" className="hover:text-teal-400 transition-colors">FAQs</a>
              </li>
              <li className="mb-2">
                <a href="/help" className="hover:text-teal-400 transition-colors">Help Center</a>
              </li>
              <li className="mb-2">
                <a href="/terms" className="hover:text-teal-400 transition-colors">Terms of Service</a>
              </li>
              <li className="mb-2">
                <a href="/privacy" className="hover:text-teal-400 transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="md:w-1/4">
            <h3 className="text-xl font-semibold mb-4">Connect with Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="hover:text-teal-400 transition-colors"
                aria-label="Facebook"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073C24 5.403 18.627 0 12 0S0 5.403 0 12.073c0 5.993 4.388 10.958 10.125 11.854v-8.385H7.078V12.07h3.047V9.42c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.95H15.29c-1.494 0-1.955.931-1.955 1.884v2.25h3.328l-.532 3.473h-2.796v8.385C19.612 23.031 24 18.066 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                className="hover:text-teal-400 transition-colors"
                aria-label="Twitter"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.954 4.569c-.885.388-1.83.654-2.825.775a4.932 4.932 0 0 0 2.163-2.723 9.864 9.864 0 0 1-3.127 1.195 4.918 4.918 0 0 0-8.379 4.482A13.933 13.933 0 0 1 1.671 3.149a4.921 4.921 0 0 0 1.523 6.563 4.897 4.897 0 0 1-2.229-.616c-.053 2.281 1.581 4.417 3.949 4.89a4.902 4.902 0 0 1-2.224.085c.625 1.951 2.444 3.377 4.6 3.417a9.876 9.876 0 0 1-6.1 2.105c-.395 0-.785-.023-1.17-.068a13.944 13.944 0 0 0 7.548 2.213c9.054 0 14.002-7.496 14.002-13.986 0-.213-.005-.425-.014-.637a9.936 9.936 0 0 0 2.457-2.548l.002-.003z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                className="hover:text-teal-400 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3H4.384A1.385 1.385 0 0 0 3 4.385v15.23C3 20.615 3.769 21 4.384 21h15.23c.616 0 1.385-.384 1.385-1.385V4.384C21 3.77 20.615 3 19.615 3zm-11.538 14h-2.846v-7.69h2.846V17zm-1.423-8.769a1.655 1.655 0 1 1 0-3.31 1.655 1.655 0 0 1 0 3.31zm12.385 8.769h-2.846v-4.174c0-.998-.018-2.285-1.39-2.285-1.39 0-1.602 1.086-1.602 2.21V17h-2.845v-7.69h2.73v1.047h.038c.382-.725 1.315-1.486 2.709-1.486 2.898 0 3.433 1.907 3.433 4.386V17z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <hr className="my-8 border-gray-700" />

        {/* Bottom Section */}
        <div className="md:flex md:items-center md:justify-between">
          <p className="text-center text-gray-400">&copy; 2024 DESIZNIDEAZ. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;