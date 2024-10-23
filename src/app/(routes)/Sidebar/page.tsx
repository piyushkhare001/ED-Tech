"use client"
import { CogIcon, PlusIcon, UserIcon} from '@heroicons/react/20/solid';
import { IoLogOut, IoDesktop } from 'react-icons/io5';
import { useState } from 'react';


const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('my-courses');

  const navItems = [
    { name: 'My Profile', icon: UserIcon, key: 'profile', link: <a href="/Profile"></a> },
    { name: 'Dashboard', icon: IoDesktop, key: 'dashboard', link: <a href="/Dashboard"></a> },
    { name: 'My Courses', icon: IoDesktop, key: 'my-course', link: <a href="/MyCourses"></a> },
    { name: 'Add Course', icon: PlusIcon, key: 'add-course', link: <a href="/AddCourses"></a> },
    { name: 'Settings', icon: CogIcon, key: 'settings', link: <a href="/Settings"></a> },
    { name: 'Logout', icon: IoLogOut, key: 'logout',link: <a href="/Logout"></a> },
  ];

  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white flex-col p-6  hidden lg:block">
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li
            key={item.key}
            className={`flex items-center p-2 rounded-lg ${
              activeTab === item.key ? 'bg-yellow-500 text-black' : 'hover:bg-gray-700'
            } cursor-pointer`}
            onClick={() => setActiveTab(item.key)}
          >
            <item.icon className="h-6 w-6 mr-3" />
            {item.link}
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
