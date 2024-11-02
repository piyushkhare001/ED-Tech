// components/CourseHighlights.tsx
import React from 'react';
import { FaLaptop, FaCertificate, FaHandsHelping, FaQuestionCircle, FaDownload, FaBriefcase, FaClock, FaUserGraduate } from 'react-icons/fa';

const highlights = [
  { icon: <FaLaptop size={24} />, title: 'Learn online', description: 'At your own schedule' },
  { icon: <FaCertificate size={24} />, title: 'Certificate of training', description: 'from DesiznIdeaz Trainings' },
  { icon: <FaBriefcase size={24} />, title: 'Placement assistance', description: 'To build your career' },
  { icon: <FaHandsHelping size={24} />, title: 'Real Industry Projects', description: 'For hands-on practice' },
  { icon: <FaUserGraduate size={24} />, title: 'Beginner friendly', description: 'No prior knowledge required' },
  { icon: <FaQuestionCircle size={24} />, title: 'Doubt clearing', description: 'Through Q&A forum' },
  { icon: <FaClock size={24} />, title: '8 weeks duration', description: '1 hr/day (flexible schedule)' },
  { icon: <FaDownload size={24} />, title: 'Downloadable content', description: 'With lifetime access' },
  { icon: <FaLaptop size={24} />, title: 'Mobile friendly', description: 'No laptop? No problem' },
];

const CourseHighlights: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Course Highlight</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {highlights.map((highlight, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-green-100 text-green-500 p-3 rounded-full mb-4">
                {highlight.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{highlight.title}</h3>
              <p className="text-gray-600">{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseHighlights;
