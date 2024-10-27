"use client"; 

//import {  signOut } from "next-auth/react";
//import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { useEffect , useState} from 'react';
import Setting from '@/components/frontend/Setting';
import Purchase from '@/components/frontend/Purchase';
import EnrolledCourse from '@/components/frontend/EnrolledCourse';
import StudentPartner from '@/components/frontend/StudentPartner';
//import { Button } from "src/components/ui/button";

import Sidebar from '@/components/frontend/Sidebar';
import ProfileDetails from '@/components/frontend/ProfileDetails';
import LoadingPage from '../loading/page';
import MyCourses from '@/components/frontend/Mycourses';
import AddCourse from '@/components/frontend/AddCourse';
//import Navbar from '@/components/frontend/Navbar';
export default function DashboardPage() {


    const [view, setView] = useState('profile');

const { data: session, status } = useSession();


console.log("session" , session)
   

    useEffect(() => {
        // Redirect to login if not authenticated
        if (status === 'unauthenticated') {
            signIn();
        }
    }, [status]);

    if (status === 'loading') {
        return <LoadingPage/>
    }

    if (session) {
        return (
            <div>

              <div className="flex">
              <Sidebar setView={setView} currentView={view} />

              <div className="flex-grow p-4">
        {/* Conditionally render components based on 'view' */}
        {view === 'settings' && <Setting />}
        {view === 'enrolledCourse' && <EnrolledCourse />}
        {view === 'purchase' && <Purchase />}
        {view === 'studentPartner' && <StudentPartner />}
        {view === 'Mycourses' && <MyCourses/>}
        {view === 'profile' && <ProfileDetails setView={setView}/>} 
        {view === 'addCourse' && <AddCourse/>}
       </div>
     
    </div>

                
            </div>
        );
    }

    return null;
}
