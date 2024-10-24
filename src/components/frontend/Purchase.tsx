import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const Purchase = () => {
  const { data: session } = useSession();

  const fetchPurchaseValidUser = async () => {
    try {
      const response = await axios.post('/api/getUserPurchase');

      if (response.status === 200) {
        // The request was successful
        console.log('User Data:', response.data);
      } else {
        console.error('Failed to fetch user:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  };

  useEffect(() => {
    fetchPurchaseValidUser();
  }, [session]); // Fetch when the session changes

  return (
    <div>
      <h1 className='font-serif text-black text-4xl m-8'>Purchase History</h1>
    </div>
  );
};

export default Purchase;