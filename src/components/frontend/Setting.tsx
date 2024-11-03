"use client";
import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { signOut } from "next-auth/react";
import ConfirmationModal from "./ConfirmationModal";
import axios from "axios";

// interface User {
//   dateOfBirth: string;
//   gender: string;
//   mobile: string;
//   about: string;
//   address: string;
//   collageName: string;
// }

const Settings = () => {
  const session = useSession();
  const userId = session?.data?.user?.id;

  const { toast } = useToast();
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [about, setAbout] = useState("");
  const [address, setAddress] = useState("");
  const [collageName, setCollageName] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    switch (name) {
      case "dateOfBirth":
        setDateOfBirth(value);
        break;
      case "gender":
        setGender(value);
        break;
      case "mobile":
        setMobile(value);
        break;
      case "about":
        setAbout(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "collageName":
        setCollageName(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`api/profile/update/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dateOfBirth,
          address,
          mobile,
          about,
          gender,
          collageName,
        }),
      });

      if (res.status === 200) {
        toast({
          title: "Profile updated successfully",
          description: "Your profile data has been updated.",
        });
      } else {
        toast({
          title: "Profile update failed",
          description: `An error occurred while updating your profile. Error code: ${res.status}`,
        });
      }
    } catch (err) {
      console.error(err); // Log the error for debugging
      toast({
        title: "Profile update failed",
        description:
          "An error occurred while updating your profile. Please try again later.",
      });
    }
  };

  const handleCancel = () => {
    setDateOfBirth(""),
      setGender(""),
      setAbout(""),
      setAddress(""),
      setCollageName(""),
      setMobile("");
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/profile/delete`);
      if (res) {
        toast({
          title: " Deleted succesfully",
          description: "your  profile data has been updated ",
        });
      }
      await signOut({ callbackUrl: "/signin" });
      setIsModalOpen(false);
    } catch (err) {
      toast({
        title: "user deletion failed",
        description: "getting server error in deleting  you ",
      });
    }
  };

  const fetchProfileData = async (userId) => {
    try {
      const response = await fetch(`/api/profile/${userId}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }

      const data = await response.json();

      setDateOfBirth(data.dateOfBirth ? formatDate(data.dateOfBirth) : "");
      setGender(data.gender || "");
      setMobile(data.mobile || "");
      setAbout(data.about || "");
      setAddress(data.address || "");
      setCollageName(data.collageName || "");
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    const userId = session.data?.user?.id; // Replace with actual user ID
    fetchProfileData(userId);
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  console.log(isHovered);
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white text-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl"
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
              value={dateOfBirth}
              onChange={handleInputChange}
              className="w-full p-3 rounded border border-gray-300 focus:ring focus:ring-yellow-200"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-2 text-gray-700">Gender</label>
            <select
              name="gender"
              value={gender}
              onChange={handleInputChange}
              className="w-full p-3 rounded border border-gray-300 focus:ring focus:ring-yellow-200"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>  
            </select>
          </div>

          {/* Contact Number */}
          <div>
            <label className="block mb-2 text-gray-700">Contact Number</label>
            <input
              type="number"
              name="mobile"
              value={mobile}
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
              value={about}
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
              value={address}
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
              value={collageName}
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

      <div className="bg-red-100 text-red-800 p-6 rounded-lg shadow-lg mt-8 max-w-lg mx-auto">
        <div className="flex items-center space-x-4">
          <div className="text-red-600 text-3xl">
            <i className="fas fa-trash-alt"></i> {/* Or any delete icon */}
          </div>
          <h2 className="text-xl font-bold">Delete Account</h2>
        </div>
        <p className="mt-4 text-sm text-gray-700">
          Would you like to delete your account? This account may contain paid
          courses. Deleting your account is permanent and will remove all the
          content associated with it.
        </p>
        <div className="mt-4">
          <button
            className={`text-red-700 underline text-sm font-semibold ${
              isHovered ? "hover:text-red-900" : ""
            }`}
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
