"use client"; // For Next.js 13 (App Directory)
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import Setting from "@/components/frontend/Setting";
import Purchase from "@/components/frontend/Purchase";
import EnrolledCourse from "@/components/frontend/EnrolledCourse";
import StudentPartner from "@/components/frontend/StudentPartner";
//import { Button } from "src/components/ui/button";
//import RazorpayButton from "src/components/frontend/TestingPaymentPage";
import Sidebar from "@/components/frontend/Sidebar";
import ProfileDetails from "@/components/frontend/ProfileDetails";
import LoadingPage from "../loading/page";
import CourseMain from "@/components/frontend/CourseMain";
import Navbar from "@/components/frontend/Navbar";

export default function page() {
  const [view, setView] = useState("profile");
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  if (status === "loading") {
    return <LoadingPage />;
  }

  if (session) {
    return (
      <div>
        <Navbar  /> 
        <div className="flex">
          <Sidebar setView={setView} currentView={view} />
          <CourseMain />
        </div>
      </div>
    );
  }
}
