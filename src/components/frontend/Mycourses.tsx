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

        setCourses(res.data); // Set the courses data
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
      <h2 className='text-4xl font-sans m-6'>Your  Courses</h2>
      {courses?.length > 0 ? (
  <>You have courses</>
) : (
  <p className='flex justify-center mt-36 font-sans text-2xl'>No courses found</p>
)}

    </div>
  );
};

export default Mycourses;
