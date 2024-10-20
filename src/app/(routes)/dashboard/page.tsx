"use client"; 

import {  signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { Button } from "src/components/ui/button";
import RazorpayButton from "src/components/frontend/TestingPaymentPage";
import axios from 'axios';



export default function DashboardPage() {





const router = useRouter()
    const { data: session, status } = useSession();
 // Retrieve JWT from localStorage (or from another authentication context)
 const userId :any = session?.user?.id;

console.log("session" , session)
   

  const handleLogout = async () => {
    const confirmation = confirm("Are you sure you want to log out?");
    if (confirmation) {
      await fetch('/api/auth/logout', { method: 'POST' });
      await signOut({ callbackUrl: '/signin' });
    }
  };


      
  const createrouter = async() => {
    router.push('/create-course')
  }

  const applyStudentPartner = async () => {
   
    try {
      const response = await axios.post('/api/student-partner/register'); // Change to POST
  
      if (response.data.success) {
        console.log(response.data, "applied for partner");
        router.push('/student-partner'); // Navigate to the student partner page
      } else {
        console.log("Error in response:", response.data.message);
      }
    } catch (err: any) {
      // Handle error response from the API
      if (err.response) {
        console.error("Error response:", err.response.data);
        console.log("Status code:", err.response.status);
        console.log("Error message:", err.response.data.message);
      } else {
        console.error("Unexpected error:", err.message);
      }
    }
  };


    useEffect(() => {
        // Redirect to login if not authenticated
        if (status === 'unauthenticated') {
            signIn();
        }
    }, [status]);

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (session) {
        return (
            <div>
               <div>
 
 <h1>  ` hy {session?.user?.name} you have loged in with {session?.user?.email} and your role is {session?.user?.role} your token is  token will expire on {session?.expires}` </h1>

{
  session?.user?.role === "student" ? (<>
   
  <Button onClick={applyStudentPartner}>Apply for student partner</Button>
  </>) : (<> you are not teacher you cant apply for student partner </>)

}

 <Button onClick={createrouter} className="bg-blue-700"> create course</Button>

 <Button  className="bg-red-700" onClick={handleLogout}>Log Out</Button>
</div>
<RazorpayButton amount={1}  userId={userId}  />
                
            </div>
        );
    }

    return null; // Or show a message like "You are not authenticated"
}