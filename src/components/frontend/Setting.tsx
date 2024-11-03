'use client';

import { useState } from 'react';
import axios from 'axios';
//import { useSession } from 'next-auth/react';
import { useToast } from "@/hooks/use-toast"
import { signOut } from 'next-auth/react';
import ConfirmationModal from './ConfirmationModal';

interface User {
  dateOfBirth: string;
  gender: string;
  mobile: string;
  about: string;
  address: string;
  collageName: string;
}

const Settings = () => {
 // const session = useSession();

  const { toast } = useToast()
  const [formData, setFormData] = useState<User>({
    dateOfBirth: '',
    gender: '',
    mobile: '',
    about: '',
    address: '',
    collageName: '',
  });



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
     const res =  await axios.put(`/api/profile/update`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(res){
        toast({
          title: "profile updated succesfully",
          description: "your  profile data has been updated ",
        })
      }
    } catch (err) {
      toast({
        title: "profile updation failed",
        description: "your  profile data did'nt get update ",
      })

    }
  }
  

  const handleCancel = () => {
    setFormData({
   
      dateOfBirth: '',
      gender: '',
      mobile: '',
      about: '',
      address: '',
      collageName: '',
    });
  };


  const  handleDelete = async () => {
    try {
      const res =  await axios.delete(`/api/profile/delete`);
       if(res){
         toast({
           title: " Deleted succesfully",
           description: "your  profile data has been updated ",
         })
       }
       await signOut({ callbackUrl: '/signin' });
       setIsModalOpen(false);
     } catch (err) {
       toast({
         title: "user deletion failed",
         description: "getting server error in deleting  you ",
       })
 
     }
   }
   
  
 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  console.log(isHovered)
  return (
    <div className="flex flex-col justify-center items-center ml-[205px] min-h-screen bg-gray-100">
      <form
        className="bg-white text-gray-800 p-8 rounded-lg shadow-lg w-full mt-4 max-w-2xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold mb-6">Additional Information</h2>

      

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
         
        
         

          {/* Date of Birth */}
          <div>
            <label className="block mb-2 text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth || ''}
              onChange={handleInputChange}
              className="w-full p-3 rounded border border-gray-300 focus:ring focus:ring-yellow-200"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-2 text-gray-700">Gender</label>
            <select
              name="gender"
              value={formData.gender || ''}
              onChange={handleInputChange}
              className="w-full p-3 rounded border border-gray-300 focus:ring focus:ring-yellow-200"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Contact Number */}
          <div>
            <label className="block mb-2 text-gray-700">Contact Number</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile || ''}
              onChange={handleInputChange}
              className="w-full p-3 rounded border border-gray-300 focus:ring focus:ring-yellow-200"
              placeholder="Enter Contact Number"
            />
          </div>

          {/* About */}
          <div>
            <label className="block mb-2 text-gray-700">About</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              className="w-full p-3 rounded border border-gray-300 focus:ring focus:ring-yellow-200"
              placeholder="Enter about yourself"
            ></textarea>
          </div>

          {/* Address */}
          <div>
            <label className="block mb-2 text-gray-700">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-3 rounded border border-gray-300 focus:ring focus:ring-yellow-200"
              placeholder="Enter address details"
            ></textarea>
          </div>

          {/* College Name */}
          <div>
            <label className="block mb-2 text-gray-700">College Name</label>
            <textarea
              name="collageName"
              value={formData.collageName}
              onChange={handleInputChange}
              className="w-full p-3 rounded border border-gray-300 focus:ring focus:ring-yellow-200"
              placeholder="Enter college details"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          {/* Cancel button */}
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded mr-4"
          >
            Cancel
          </button>

          {/* Save button */}
          <button
            type="submit"
            className="py-2 px-4 rounded bg-yellow-500 text-white cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>

      <div className="bg-red-100 text-red-800 p-6 rounded-lg shadow-lg mt-8 ml-[40px] mx-auto">
            <div className="flex items-center space-x-4">
                <div className="text-red-600 text-3xl">
                    <i className="fas fa-trash-alt"></i> {/* Or any delete icon */}
                </div>
                <h2 className="text-xl font-bold">Delete Account</h2>
            </div>
            <p className="mt-4 text-sm text-gray-700">
                Would you like to delete your account? This account may contain paid courses.
                Deleting your account is permanent and will remove all the content associated with it.
            </p>
            <div className="mt-4">
                <button
                    className={`text-red-700 underline text-sm font-semibold ${isHovered ? 'hover:text-red-900' : ''}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => setIsModalOpen(true)}
                >
                    I want to delete my account.
                </button>
            </div>
        </div>
        <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Deletion Confirmation"
        description=" Would you like to delete your account? This account may contain paid courses."
      />
    </div>
  );
};

export default Settings;
