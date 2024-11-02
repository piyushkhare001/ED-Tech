


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
    <div className="bg-gray-100 min-h-screen  p-6">
      <h1 className="text-3xl font-bold text-center mb-6 mt-10">Available Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map(course => (
             <div  key={course._id} className="bg-white border mt-10 w-[23rem] rounded-lg shadow-md overflow-hidden">
             {/* Course Category */}
          
       
             {/* Course Image */}
             <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />
       
             <div className="p-4">
               {/* Title */}
               <h2 className="text-lg font-semibold">{course.title}</h2>
               <h3 className="text-lg font-semibold">{course.description}</h3>
               
        
             
               {/* Rating and Reviews */}
               <div className="flex items-center mt-2">
                 <span className="text-yellow-500">⭐⭐⭐⭐⭐ </span>
               
               </div>
               
               {/* Price */}
               <div className="mt-2">
                 <span className="text-lg font-semibold text-red-500">₹{course.price}</span>
           
               </div>
               
               {/* Add to Cart Button */}
               <Link href={`/courses/${course._id}`}>
               <Button className="w-full bg-green-500 text-white font-bold py-2 mt-3 rounded-lg">Buy Now</Button>
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






