'use client';

import { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';


interface User {
  dateOfBirth: string;
  gender: string;
  mobile: string;
  about: string;
  address: string;
  collageName: string;
}

const Settings = () => {
  const session = useSession();
  const profileId = session?.data?.user?.id
  const [formData, setFormData] = useState<User>({
    dateOfBirth: '',
    gender: '',
    mobile: '',
    about: '',
    address: '',
    collageName: '',
  });
  const [error, setError] = useState<string | null>(null);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
// Handle form submission
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await axios.put(`/api/profile/update/${profileId}`, formData); // Using dynamic userId in the URL
    alert('Profile updated successfully!');
  } catch (err) {
    setError('Failed to update profile.');
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white text-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold mb-6">Additional Information</h2>

        {error && <p className="text-red-500">{error}</p>}

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
    </div>
  );
};

export default Settings;
