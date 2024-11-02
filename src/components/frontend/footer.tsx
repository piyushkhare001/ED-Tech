import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-4 md:flex md:justify-between">
        
        {/* Company Info */}
        <div className="mb-8 md:w-1/4">
          <h2 className="text-lg font-bold mb-4 text-green-400">DesiznIdeaz</h2>
          <p className="text-lg mb-2 font-sans">
            Desiznideaz Private Limited is an IT services and IT consulting company that offers software development and training courses. The company is based in Patna, Bihar and was founded in 2021.
          </p>
          <p className="text-sm mb-2 font-sans">Desiznideaz is a training partner of Autodesk, Microsoft, EC-Council, Cisco, and Adobe.</p>
          <p className="text-sm mb-2 font-sans" >Address: Near DAV Public School, Maurya Vihar Colony, Kumhrar, Patna, Bihar – 800026</p>
          <p className="text-sm mb-2 font-sans">Call: +91 9279556632</p>
          <p className="text-sm font-sans">Email: hr@desiznideaz.com</p>
        </div>
        
        {/* Useful Links */}
        <div className="mb-8 md:w-1/5">
          <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
          <ul>
            <li><Link href="#" className="text-sm hover:text-gray-300 font-sans">Terms & Conditions</Link></li>
            <li><Link href="#" className="text-sm hover:text-gray-300 font-sans">Privacy</Link></li>
            <li><Link href="#" className="text-sm hover:text-gray-300 font-sans">Contact Us</Link></li>
          </ul>
        </div>
        
        {/* Our Company */}
        <div className="mb-8 md:w-1/5">
          <h3 className="text-lg font-semibold mb-4 ">Our Company</h3>
          <ul>
            <li><Link href="#" className="text-sm hover:text-gray-300 font-sans ">About Us</Link></li>
            <li><Link href="#" className="text-sm hover:text-gray-300 font-sans">We Are Hiring</Link></li>
            <li><Link href="#" className="text-sm hover:text-gray-300 font-sans">Hire Interns For Your Company</Link></li>
            <li><Link href="#" className="text-sm hover:text-gray-300 font-sans">Post A Job</Link></li>
          </ul>
        </div>
        
        {/* Career Advancement Course */}
        <div className="mb-8 md:w-1/4">
          <h3 className="text-lg font-semibold mb-4">Career Advancement Course</h3>
          <ul>
            <li><Link href="#" className=" font-sans text-sm hover:text-gray-300">Learning Path In Full Stack Development</Link></li>
            <li><Link href="#" className=" font-sans vtext-sm hover:text-gray-300">Learning Path In Data Science</Link></li>
            <li><Link href="#" className=" font-sans text-sm hover:text-gray-300">Learning Path In CAD</Link></li>
            <li><Link href="#" className=" font-sans text-sm hover:text-gray-300">Learning Path In CAE</Link></li>
            <li><Link href="#" className=" font-sans text-sm hover:text-gray-300">Diploma In Interior & Exterior Designing</Link></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-800 pt-6 mt-6">
        <div className="container mx-auto flex flex-col items-center md:flex-row md:justify-between px-4">
          <div className="mb-4 md:mb-0">
            <button className="bg-gray-800 px-4 py-2 text-sm rounded hover:bg-gray-700 flex items-center">
              <span className="material-icons font-sans mr-2">android</span> Get The Android App
            </button>
          </div>
          <p className="text-sm">© Copyright 2024 <span className="text-green-400">DesiznIdeaz</span></p>
          <div className="flex space-x-4 text-sm mt-4 md:mt-0">
            <Link href="#" className="hover:text-gray-300">Instagram</Link>
            <Link href="#" className="hover:text-gray-300">X</Link>
            <Link href="#" className="hover:text-gray-300">LinkedIn</Link>
            <Link href="#" className="hover:text-gray-300">YouTube</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
