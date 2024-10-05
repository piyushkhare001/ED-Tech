
"use client";

import Footer from "components/frontend/footer";
import RazorpayButton from "components/frontend/TestingPaymentPage";
import Hero from "components/frontend/Hero";
import MobileNav from "components/frontend/MobileNav";
import Navbar from "components/frontend/Navbar";
import { useState } from "react";

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
