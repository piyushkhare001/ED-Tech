"use client";
import Image from "next/image";
import logo from "../../assets/logo.jpeg";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
//import { useRouter } from "next/navigation";



const MenuLinks = [
  {
    id: 1,
    name: "Home",
    link: "/#",
  },
  {
    id: 2,
    name: "About",
    link: "/#about",
  },

  {
    id: 3,
    name: "Courses",
    link: "/#courses",
  },
  {
    id: 4,
    name: "Certificate",
    link: "/#certificate",
  },
  {
    id: 5,
    name: "Contact",
    link: "/#contact",
  },
];

const Navbar =() => {
    return <>
        <div className="bg-slate-900 w-[100%] h-[80px] shadow-2xl sticky z-[10000]">
            <div className="">
                <motion.div 
                initial= {{opacity:0, y:-50}}
                animate= {{opacity: 1, y: 0}}
                className="container flex justify-between items-center">
                    {/*logo and link section*/}
                    <div className="flex items-center">
                        <div className="flex gap-3">
                            <Image src={logo} alt='Logo' width={72} height={20} className='pt-1 -ml-[100px] rounded-full'/>
                            <h1 className="text-white font-semibold text-2xl pt-5 hover:text-gray-200 sm:text-3xl">DESIZNIDEAZ</h1>
                        </div>
                    </div>
                    {/*menu items*/}
                    <div className="hidden lg:block pt-3">
                            <ul className="flex items-center gap-2">
                                {
                                    MenuLinks.map((data, index) => (
                                        <li key={index}>
                                            <a href={data.link}
                                                className="inline-block px-2 font-lg text-white/90 text-lg hover:text-gray-100 hover:text-xl text-center
                                                "
                                            > {data.name}</a>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    {/*navbar right section*/}
                    <div className="relative group hidden lg:block pt-3 -mr-24 gap-2">
                        <button className="bg-slate-800 border-gray-800 w-[90px] h-[50px] rounded-lg text-lg font-semibold text-gray-400 hover:bg-gray-400 hover:text-black mr-4">Login</button>
                        <button className="bg-slate-800 border-gray-800 w-[96px] h-[50px] rounded-lg text-lg font-semibold text-gray-400 hover:bg-gray-400 hover:text-black">SignUp</button>
                    </div> 
                    <div  className='flex lg:hidden text-white'>
                        <Bars3Icon className='w-[3rem] lg:hidden h-[3rem] cursor-pointer text-white -mr-12 mt-3'/>
                    </div>                   
                </motion.div>
                
            </div>
        </div>
      <hr />
    </>
};

export default Navbar;
