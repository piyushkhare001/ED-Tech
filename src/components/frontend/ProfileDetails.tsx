'use client'
import React  from 'react';
import Avatar from 'react-avatar';
import { useSession } from 'next-auth/react';


import { useState, useEffect } from 'react';

interface User {
 
  name: string;
  email: string;

  about : string;
  mobile: any;
  gender : string;
  collageName : string;

  address : string

}

interface SidebarProps {
  setView: (view: string) => void;


}


const ProfileDetails:  React.FC<SidebarProps> = ({ setView  }) => {
  const  session  = useSession();

 const [userData, setUserData] = useState<User | null>(null);

 const handelEdit = async() => {
      setView('settings')
   
    }


    const fetchUserData = async () => {
      if (session) {
        try {
          const res = await fetch(`/api/getProfileById/${session?.data?.user?.id}`);
          if (!res.ok) {
            console.log('got error at the time of calling api');
        
          }
          const data = await res.json();
          setUserData(data);
       
        } catch (error : any) {
           console.log('Failed to fetch user data');
       
        }
      }
    };
    
    useEffect( () => {
    fetchUserData()
    }, [session])
  

  return (
    <div className="flex-1 p-10">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <div className="flex items-center mb-6">
        <div className="relative">
        <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-6 max-w-3xl w-[70rem]">
        <div className="flex items-center">
          <Avatar 
            name={userData?.name|| session?.data?.user?.name ||  'Unknown User'} 
            size="70" 
            round={true} 
            color="#F44336" // Change color if needed
          />
          <div className="ml-4">
            <p className="text-gray-600 text-lg font-semibold">
              {session?.data?.user?.name || 'Unknown User'}
            </p>
            <p className="text-gray-600">{session?.data?.user?.email || 'No email provided'}</p>
          </div>
        </div>
        {/* Edit Button */}
        <button onClick={handelEdit} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center">
          Edit
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536M9 13l6-6 3.536 3.536-6 6H9v-3.536z"
            />
          </svg>
        </button>
      </div>

     </div>
    
 
      </div>
      <div className="relative flex justify-between items-center bg-white shadow-md rounded-lg p-6 max-w-3xl mt-4 ">
      {/* About Section */}
      <div className="flex items-center">
        <div className="ml-4">
          <h2 className="text-xl font-semibold text-gray-800">About</h2>
          <p className="text-gray-600 mt-1">
           {userData?.about || ' Write Something About Yourself....'}
          </p>
        </div>
      </div>

      {/* Edit Button */}
      <button
onClick={handelEdit}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center"
      >
        Edit
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 ml-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.232 5.232l3.536 3.536M9 13l6-6 3.536 3.536-6 6H9v-3.536z"
          />
        </svg>
      </button>
    </div>
    <div className="relative flex  justify-between items-center bg-white shadow-md rounded-lg p-6 max-w-3xl  mt-4">
      <div className='flex flex-col pl-4'>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Personal Details</h2>
      
    <div className='flex flex-col gap-6 '>
      <div className='flex gap-16'>
        <div className="flex flex-col gap-2">
          <label htmlFor="phoneNumber" className="text-gray-700">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            className="border rounded px-3 py-2"
            placeholder={userData?.mobile || "Add Contact Number"    }
            readOnly
          />
        </div>
        
        <div className="flex flex-col gap-2 ">
          <label htmlFor="phoneNumber" className="text-gray-700">Address</label>
          <input
            type="tel"
            id="phoneNumber"
            className="border rounded px-3 py-2"
            placeholder={userData?.address|| "Add your address"    }    
            readOnly
          />
        </div>
        </div>
        { session?.data?.user?.role === "teacher" ? (<></>) :
      (<div className='flex gap-16'>  <div className="flex flex-col gap-2 ">
          <label htmlFor="phoneNumber" className="text-gray-700">Gender</label>
          <input
            type="tel"
            id="phoneNumber"
            className="border rounded px-3 py-2"
            placeholder={userData?.gender || "Add your gender"    }
            readOnly
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <label htmlFor="phoneNumber" className="text-gray-700">Collage Name</label>
          <input
            type="tel"
            id="phoneNumber"
            className="border rounded px-3 py-2"
            placeholder={userData?.collageName || "Add your collage name"    }
            readOnly
          />
        </div>
        </div>)
        }
    
  </div>
  
</div>
        <div className="col-span-2   
 flex justify-end">
           <button  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center" 
            onClick={handelEdit}
           >
           
           
          Edit
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536M9 13l6-6 3.536 3.536-6 6H9v-3.536z"
            />
          </svg>
        </button>
        </div>
      
    </div>
</div>
  );
};

export default ProfileDetails;
