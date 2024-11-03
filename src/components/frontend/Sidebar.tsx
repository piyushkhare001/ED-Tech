import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '../ui/button';
import ConfirmationModal from './ConfirmationModal';

interface SidebarProps {
  setView: (view: string) => void;
  currentView: string;
}

const Sidebar: React.FC<SidebarProps> = ({ setView, currentView }) => {
  const session = useSession();
  const role = session?.data?.user?.role;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    await signOut({ callbackUrl: '/signin' });
    setIsModalOpen(false);
  }; 

  return (
    <div className="bg-teal-500 text-white w-60 fixed h-screen pl-14 flex flex-col justify-evenly">

      <div className="flex flex-col">
        <h2 className="text-xl font-sans text-white">👋 Hi, {session?.data?.user?.name}</h2>
        <p className="text-lg text-black font-medium">{role}</p>
      </div>

      <nav>
        <ul className="flex flex-col gap-4">
          {role === 'teacher' && (
            <>
              <li
                className={`mb-4 cursor-pointer ${currentView === 'profile' ? 'bg-teal-800 text-white' : 'text-gray-200 hover:text- hover:bg-teal-700'}`}
                onClick={() => setView('profile')}
              >
                <div className="flex items-center space-x-2">
                  <span>My Profile</span>
                </div>
              </li>
              <li
                className={`mb-4 cursor-pointer ${currentView === 'Mycourses' ? 'bg-teal-800 text-white' : 'text-gray-200 hover:text-white hover:bg-teal-900'}`}
                onClick={() => setView('Mycourses')}
              >
                <div className="flex items-center space-x-2">
                  <span>My Courses</span>
                </div>
              </li>
              <li
                className={`mb-4 cursor-pointer ${currentView === 'addCourse' ? 'text-teal-900' : 'text-gray-200 hover:text-white'}`}
                onClick={() => setView('addCourse')}
              >
                <div className="flex items-center space-x-2">
                  <span>Add Courses</span>
                </div>
              </li>
              <li
                className={`mb-4 cursor-pointer ${currentView === 'settings' ? 'text-treal-900' : 'text-gray-200 hover:text-white'}`}
                onClick={() => setView('settings')}
              >
                <div className="flex items-center space-x-2">
                  <span>Settings</span>
                </div>
              </li>
            </>
          )}

          {role === 'student' && (
            <>
              <li
                className={`mb-4 cursor-pointer ${currentView === 'profile' ? 'text-teal-950 font-semibold' : 'text-gray-200 hover:text-white'}`}
                onClick={() => setView('profile')}
              >
                <div className="flex items-center space-x-2">
                  <span>My Profile</span>
                </div>
              </li>
              <li
                className={`mb-4 cursor-pointer ${currentView === 'enrolledCourse' ? 'text-teal-950 font-semibold' : 'text-gray-200 hover:text-white'}`}
                onClick={() => setView('enrolledCourse')}
              >
                <div className="flex items-center space-x-2">
                  <span>Enrolled Courses</span>
                </div>
              </li>
              <li
                className={`mb-4 cursor-pointer ${currentView === 'settings' ? 'text-teal-950 font-semibold' : 'text-gray-200 hover:text-white'}`}
                onClick={() => setView('settings')}
              >
                <div className="flex items-center space-x-2">
                  <span>Settings</span>
                </div>
              </li>
              <li
                className={`mb-4 cursor-pointer ${currentView === 'studentPartner' ? 'text-teal-950 font-semibold': 'text-gray-200 hover:text-white'}`}
                onClick={() => setView('studentPartner')}
              >
                <div className="flex items-center space-x-2">
                  <span>Student Partner</span>
                </div>
              </li>
              <li
                className={`mb-4 cursor-pointer ${currentView === 'purchase' ? 'text-teal-950 font-semibold' : 'text-gray-200 hover:text-white'}`}
                onClick={() => setView('purchase')}
              >
                <div className="flex items-center space-x-2">
                  <span>Purchase History</span>
                </div>
              </li>
            </>
          )}
        </ul>
      </nav>

      <Button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center mr-16 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
      >
        <span>Log out</span>
      </Button>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
        title="Logout Confirmation"
        description="Are you sure you want to log out?"
      />
    </div>
  );
};

export default Sidebar;
