import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';

const EnrolledCourse = () => {
  const { data: session } = useSession();

  // Function to fetch user by email
  const fetchUserByEmail = async () => {
    if (!session?.user?.email) return; // Ensure email is available

    try {
      const response = await fetch(`/api/getUserByEmail?email=${session.user.email}`, {
        method: 'GET', // Ensure you are using GET
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const userData = await response.json();
      console.log('User Data:', userData);
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  };

  useEffect(() => {
    fetchUserByEmail();
  }, [session]); // Fetch when the session changes

  return (
    <div>
      <h1 className='font-serif text-black text-4xl m-8'>Enrolled Courses</h1>
    </div>
  );
};

export default EnrolledCourse;
