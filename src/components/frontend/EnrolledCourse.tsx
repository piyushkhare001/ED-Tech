import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Spinner from '../ui/spinner';

const  
EnrolledCourses: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const session = useSession();
  const userId = session?.data?.user?.id;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`/api/getEnrollCourse/${userId}`);
        setCourses(response.data); // Set the courses data
      } catch (err) {
        console.error('Error fetching enrolled courses:', err);
        setError('Failed to fetch enrolled courses.');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchCourses();
    }
  }, [userId]); // Added userId to dependencies to refetch when it changes

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className='text-3xl font-sans mt-2'>Your Enrolled Courses</h2>
      {courses.length > 0 ? (
        <ul>
          {courses.map(course => (
            <div key={course.id} className='flex pl-14'>
              <div className="bg-white mt-10 shadow-lg w-80 rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">{course.title}</h2>
                  <p className="text-gray-600 mt-2">{course.description}</p>
                  <div className="mt-4">
                    <span className="text-lg font-bold text-green-600">₹ {course.price}</span>
                    {course.openToEveryone && (
                      <span className="ml-2 text-sm text-blue-500">Open to Everyone</span>
                    )}
                  </div>
                  <div className="mt-2">
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                            Progress
                          </span>
                        </div>
                        <div className="text-xs font-semibold inline-block text-teal-600">
                          {course.progressPercentage}%
                        </div>
                      </div>
                      <div className="flex h-2 mb-4 overflow-hidden text-xs bg-gray-200 rounded">
                        <div
                          style={{ width: `${course.progressPercentage}%` }}
                          className="flex flex-col text-center text-white bg-teal-600 shadow-none whitespace-nowrap transition-all duration-500 ease-in-out"
                        />
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 rounded">
                    View Course
                  </button>
                </div>
              </div>
            </div>
          ))}
        </ul>
      ) : (
        <p className='text-center'>No courses found</p>
      )}
    </div>
  );
};

export default EnrolledCourses;
