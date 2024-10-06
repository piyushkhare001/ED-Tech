import React from "react";
import hero from "../../assets/hero.png";
import certification from "../../assets/certification.jpg";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaHandshake,
  FaLaptop,
  FaPaintBrush,
  FaPhotoVideo,
} from "react-icons/fa";
import { SiAlwaysdata } from "react-icons/si";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { IoLanguage } from "react-icons/io5";

export const FadeUp = (delay: number) => {
  return {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.5,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};

const ServicesData = [
  {
    id: 1,
    title: "Business Management",
    link: "#",
    icon: <FaHandshake />,
    delay: 0.2,
  },
  {
    id: 2,
    title: "Programming",
    link: "#",
    icon: <FaLaptop />,
    delay: 0.3,
  },
  {
    id: 3,
    title: "Art & Craft",
    link: "#",
    icon: <FaPaintBrush />,
    delay: 0.4,
  },
  {
    id: 4,
    title: "Data Science",
    link: "#",
    icon: <SiAlwaysdata />,
    delay: 0.5,
  },
  {
    id: 5,
    title: "Video & Photography",
    link: "#",
    icon: <FaPhotoVideo />,
    delay: 0.6,
  },
  {
    id: 6,
    title: "Finance",
    link: "#",
    icon: <FaMoneyBillTrendUp />,
    delay: 0.7,
  },
  {
    id: 7,
    title: "Language",
    link: "#",
    icon: <IoLanguage />,
    delay: 0.8,
  },
];

const Certification = [
  {
    id: 1,
    title: "Web Development",
    icon: (
      <Image
        src={certification}
        alt="Pic"
        width={50}
        height={20}
        className="w-[70px] h-[65px] rounded-full"
      />
    ),
    delay: 0.2,
  },
  {
    id: 2,
    title: "Programing with Python",
    icon: (
      <Image
        src={certification}
        alt="Pic"
        width={50}
        height={20}
        className="w-[70px] h-[65px] rounded-full"
      />
    ),
    delay: 0.3,
  },
  {
    id: 1,
    title: "Digital Marketing",
    icon: (
      <Image
        src={certification}
        alt="Pic"
        width={50}
        height={20}
        className="w-[70px] h-[65px] rounded-full"
      />
    ),
    delay: 0.4,
  },
  {
    id: 1,
    title: "Machine Learning",
    icon: (
      <Image
        src={certification}
        alt="Pic"
        width={50}
        height={20}
        className="w-[70px] h-[65px] rounded-full"
      />
    ),
    delay: 0.5,
  },
];

const SlideLeft = (delay: number) => {
  return {
    initial: {
      opacity: 0,
      x: 50,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};

const Hero = () => {
  return (
    <section className="bg-slate-900 overflow-hidden relative">
      <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[650px] shadow-2xl pb-6">
        {/* info section */}
        <div className="flex flex-col justify-center py-14 md:py-0 relative z-20">
          <div className="text-center md:text-left space-y-10 lg:max-w-[400px]">
            <motion.h1
              variants={FadeUp(0.6)}
              initial="initial"
              animate="animate"
              className="text-3xl lg:text-5xl font-bold leading-snug text-white"
            >
              A broad Selection of
              <span className="bg-gradient-to-r from-sky-400 via-blue-300 to-blue-500 text-transparent bg-clip-text">
                {" "}
                Courses
              </span>
            </motion.h1>
            <motion.p
              variants={FadeUp(0.6)}
              initial="initial"
              animate="animate"
              className="text-lg lg:text-xl text-yellow-100  "
            >
              Choose from several online courses with new additions published
              every month
            </motion.p>
            <motion.div
              variants={FadeUp(0.7)}
              initial="initial"
              animate="animate"
              className="justify-center flex md:justify-start transition-all duration-300"
            >
              <button className="w-[138px] h-[40px] font-semibold text-xl rounded-xl bg-yellow-200 text-black hover:bg-green-600 hover:text-white">
                Find Courses
              </button>
            </motion.div>
          </div>
        </div>
        {/* Image section */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
          className="flex justify-center items-center"
        >
          <Image
            src={hero}
            alt="Hero"
            width={400}
            height={10}
            className='xl:w-[600px] relative z-10 h-[390px] w-[500px] rounded-3xl" />
'
          />
        </motion.div>
      </div>
      <div className="bg-slate-700 shadow-2xl h-[1000px] lg:h-[600px] ">
        <div className="container pt-10">
          <h1 className="text-3xl lg:text-5xl items-center justify-center font-bold text-center text-slate-100">
            Online{" "}
            <span className="bg-gradient-to-r from-sky-400 via-blue-300 to-blue-500 text-transparent bg-clip-text">
              Classes
            </span>{" "}
            for Remote Learning{" "}
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-8 pt-14">
            {ServicesData.map((service) => (
              <motion.div
                key={service.id}
                variants={SlideLeft(service.delay)}
                initial="initial"
                whileInView={"animate"}
                viewport={{ once: true }}
                className="bg-[#eed5d5] rounded-2xl flex flex-col gap-4 w-[140px] items-center justify-center p-4 py-7 hover:bg-white hover:scale-110 duration-300 shadow-2xl"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h1 className="text-lg font-semibold text-center px-3 text-red-900">
                  {service.title}
                </h1>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-slate-900 h-[800px] lg:h-[500px]">
        <div className="pt-6 container">
          <h1 className="text-3xl lg:text-5xl items-center justify-center pt-6 font-bold text-center text-slate-100 bg-gradient-to-r from-sky-400 via-blue-300 to-blue-500 text-transparent bg-clip-text">
            Certification Course{" "}
          </h1>
          <p className="text-yellow-300 text-center pt-4 text-lg lg:text-2xl font-medium">
            Fastest way to build your CV.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 pt-14 lg:pl-[90px] lg:gap-48 gap-24 -ml-14">
            {Certification.map((data) => (
              <div
                key={data.id}
                className="bg-[#a1e6bb] rounded-2xl flex flex-col gap-4 w-[200px] items-center justify-center p-4 py-7 hover:bg-white hover:scale-110 duration-300 shadow-2xl"
              >
                <div className="text-4xl mb-4">{data.icon}</div>
                <h1 className="text-lg font-semibold text-center px-3 text-[#0f3a1f]">
                  {data.title}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-[#1f756e17] h-[850px] lg:h-[500px]">
        <div className="pt-4 container">
          <h1 className="text-3xl lg:text-5xl items-center justify-center pt-10 font-bold text-center text-[#a8e940]">
            Career Advancement Courses
          </h1>
          <p className="text-[#97e2b4] text-center pt-4 text-sm lg:text-xl font-medium">
            Guaranteed Placement Get 100% refund if you not hired Become job
            ready
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 pt-16 lg:pl-[90px] lg:gap-48 gap-24 -ml-14">
            {Certification.map((data) => (
              <div
                key={data.id}
                className="bg-[#daeca6] rounded-2xl flex flex-col gap-4 w-[200px] items-center justify-center p-4 py-7 hover:bg-white hover:scale-110 duration-300 shadow-2xl"
              >
                <div className="text-4xl mb-4">{data.icon}</div>
                <h1 className="text-lg font-semibold text-center px-3 text-[#992c24]">
                  {data.title}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-[350px]">
        <div className="pt-12">
          <motion.h1
            variants={FadeUp(0.6)}
            initial="initial"
            animate="animate"
            className="text-3xl lg:text-5xl font-bold leading-snug text-white text-center"
          >
            Want to
            <span className="bg-gradient-to-r from-sky-400 via-blue-300 to-blue-500 text-transparent bg-clip-text">
              {" "}
              Work
            </span>{" "}
            With Us
          </motion.h1>
          <motion.p
            variants={FadeUp(0.6)}
            initial="initial"
            animate="animate"
            className="text-lg lg:text-xl text-yellow-100 text-center pt-10"
          >
            Register As{" "}
            <span className="text-[#db96f8bb] font-semibold">DESIZNIDEAZ</span>{" "}
            Student Partner
          </motion.p>
          <motion.div
            variants={FadeUp(0.7)}
            initial="initial"
            animate="animate"
            className="transition-all duration-300 justify-center items-center text-center pt-10"
          >
            <button className="w-[138px] h-[40px] font-semibold text-xl rounded-xl bg-yellow-200 text-black hover:bg-green-600 hover:text-white">
              Register Now
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
