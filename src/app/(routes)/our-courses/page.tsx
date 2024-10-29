'use client'
import React, { useEffect, useState } from 'react';
import NavBar from '@/components/frontend/Navbar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Footer from '@/components/frontend/footer';
type Course = {
    _id: string;
    appxCourseId: string;
    title: string;
    imageUrl: string;
    description: string;
    openToEveryone: boolean;
    price: number;
    certIssued: boolean;
    createdBy: string;
  };
const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/course/fetch');
        const data = await response.json();
        console.log(data)
        if (data.success) {
          setCourses(data.data);
        } else {
          console.error('Failed to fetch courses:', data.message);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
    <NavBar/>

    <div className="p-6 bg-gray-100 min-h-screen">
        
 
        
    <h1 className="text-3xl font-bold mb-6 text-center">Available Courses</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course) => (
        <div key={course._id} className="bg-white border rounded-lg shadow-md overflow-hidden">
          {/* Course Image */}
          {course.imageUrl && (
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
          )}

          {/* Course Info */}
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="text-gray-600 mb-3">{course.description}</p>

            <div className="flex items-center justify-between mb-3">
              {/* Accessibility Status */}
              <span
                className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                  course.openToEveryone ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {course.openToEveryone ? 'Open to Everyone' : 'Restricted Access'}
              </span>

              {/* Certification Status */}
              <span
                className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                  course.certIssued ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {course.certIssued ? 'Certificate Issued' : 'No Certificate'}
              </span>
            </div>

            {/* Price */}
            <p className="text-lg font-semibold">
              {course.price > 0 ? `$${course.price}` : 'Free'}
            </p>
            <Link href={`/courses/${course._id}`}>
              <Button>Buy Now</Button>
            </Link>
          </div>
        </div>
      ))}
    </div>

  </div>
      <Footer/>
  </>
  );
};

export default CoursesPage;
