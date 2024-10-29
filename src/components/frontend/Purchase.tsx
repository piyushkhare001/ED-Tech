import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';

import { useState } from 'react';

const Purchase = () => {
  const session =  useSession();

  const [userData, setUserData] = useState(null);


  const fetchUserPurchase = async () => {
    const userId = await session?.data?.user?.id
    if (userId) {
      try {
        const res = await fetch(`/api/getUserPurchase/${userId}`);
        const response = await res.json()
    
        setUserData(response);
     
      } catch (error : any) {
         console.log('Failed to fetch user data');
     
      }
    }
  }
  console.log(userData)
  useEffect(() => {
    if (session) {
      fetchUserPurchase();
    }
  }, []);

  return (
    <div>
      <h1 className='font-serif text-black text-4xl m-8'>Purchased Courses</h1>
      <p>{}</p>
    </div>
  );
};

export default Purchase;
