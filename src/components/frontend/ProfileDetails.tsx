'use client'
import React from 'react';
import Avatar from 'react-avatar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const ProfileDetails: React.FC = () => {
  const  session  = useSession();
 const router = useRouter()


 const handelEdit = async() => {
      router.push('/dashboard/setting')
    }

  return (
    <div className="flex-1 p-10">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <div className="flex items-center mb-6">
        <div className="relative">
        <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-6 max-w-3xl w-[70rem]">
        <div className="flex items-center">
          <Avatar 
            name={session?.data?.user?.name || 'Unknown User'} 
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
            Write Something About Yourself....
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
      
    <div className='flex gap-16'>
        <div className="flex flex-col gap-2">
          <label htmlFor="phoneNumber" className="text-gray-700">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            className="border rounded px-3 py-2"
            placeholder="Add Contact Number"
            readOnly
          />
        </div>
        
        <div className="flex flex-col gap-2 ">
          <label htmlFor="phoneNumber" className="text-gray-700">Address</label>
          <input
            type="tel"
            id="phoneNumber"
            className="border rounded px-3 py-2"
            placeholder="Add Contact Number"
            readOnly
          />
        </div>
    
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
