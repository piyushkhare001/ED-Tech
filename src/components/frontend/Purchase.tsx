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
        if (!res.ok) {
          console.log('got error at the time of calling api');
      
        }
        const data = await res.json();
        setUserData(data);
     
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
    <div className='ml-64'>
      <h1 className='font-serif text-black text-4xl m-8'>Purchased Courses!</h1>
      <p>{}</p>
    </div>
  );
};

export default Purchase;
