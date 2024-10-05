
"use client";

import Hero from "components/Hero/Hero";
import MobileNav from "components/Navbar/MobileNav";
import Navbar from "components/Navbar/Navbar";
import { useState } from "react";
import RazorpayButton from '@/components/frontend/TestingPaymentPage';
import Footer from "@/components/frontend/footer";

const Home = () => {
  const [nav, setNav] = useState(false);
  const openNav = () => setNav(true);
  const closeNav = () => setNav(false);
  return (
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
  );
};
export default Home;
