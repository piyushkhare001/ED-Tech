import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import { useSession } from 'next-auth/react';
import Spinner from '../ui/spinner';


const Mycourses: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const session = useSession();
  const userId = session?.data?.user?.id;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`/api/getTeacherCreatedCoures/${userId}`);
 const res = await response.json();
console.log("res",res)
        setCourses(res); // Set the courses data
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
 console.log(courses)
  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto">
    <h2 className="text-3xl font-sans mt-2">Your Created Courses</h2>
    {courses?.length > 0 ? (
      <div className="grid mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div
            key={course?.id}
            className="flex flex-col space-y-2 border rounded-lg bg-white p-4 hover:shadow-lg"
          >
            <img
              src={course?.imageUrl}
              alt={course?.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{course?.title}</h2>
                <p className="text-gray-600 mt-2">{course?.description}</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-green-600">₹ {course?.price}</span>
                {course?.openToEveryone && (
                  <span className="text-sm text-blue-500">Open to Everyone</span>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                  Progress
                </span>
                <span className="text-xs font-semibold ml-2">{course?.progressPercentage}%</span>
              </div>
              <div className="flex h-2 mb-4 overflow-hidden text-xs bg-gray-200 rounded">
                <div
                  style={{ width: `${course?.progressPercentage}%` }}
                  className="flex flex-col text-center text-white bg-teal-600 shadow-none whitespace-nowrap transition-all duration-500 ease-in-out"
                />
              </div>
            </div>
            <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 rounded">
              Add Content
            </button>
          </div>
        ))}
      </div>
    ) : (
      <p className="flex justify-center mt-36 font-sans text-2xl">No courses found</p>
    )}
  </div>
  );
};

export default Mycourses;
