
"use client";
import { useState } from "react";
import CertifiedCourse from "src/components/frontend/CertifiedCourse";
import CoursesBuy from "src/components/frontend/CourseBuy";
import Footer from "src/components/frontend/footer";
import Hero from "src/components/frontend/Hero";
import MobileNav from "src/components/frontend/MobileNav";
import Navbar from "src/components/frontend/Navbar";
import PlacementCourse from "src/components/frontend/PlacementCourses";
import RazorpayButton from "src/components/frontend/TestingPaymentPage";



const Home = () => {
  const [nav, setNav] = useState(false);
  const openNav = () => setNav(true);
  const closeNav = () => setNav(false);
  return (
    <div>
      <div className="overflow-x-hidden flex flex-col gap-[100px]">
        <div>
          {/*Navbar section*/}
          <MobileNav nav={nav} closeNav={closeNav}/>
          <Navbar openNav={openNav}/>
          {/*Hero section*/}
          <Hero />
          <Footer/>
          <RazorpayButton amount={1} />
        </div>
      </div>
   
    </div>
  );
};
export default Home;
