'use client'
import Image from 'next/image';
import logo from '@assets/logo.jpeg'
import { Bars3Icon } from '@heroicons/react/20/solid';
import {motion} from "framer-motion"

interface Props {
    openNav:() => void;
}

const MenuLinks = [
    {
        id: 1,
        name: "Home",
        link: "/#"
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
    }
]

const Navbar =({openNav}:Props) => {
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
                            <Image src={logo} alt='Logo' width={72} height={20} className='pt-1 -ml-14 rounded-xl'/>
                            <h1 className="text-yellow-200 font-semibold text-2xl pt-5 hover:text-yellow-400 tracking-widest sm:text-3xl">DESIZNIDEAZ</h1>
                        </div>
                    </div>
                    {/*menu items*/}
                    <div className="hidden lg:block pt-3">
                            <ul className="flex items-center gap-3">
                                {
                                    MenuLinks.map((data, index) => (
                                        <li key={index}>
                                            <a href={data.link}
                                                className="inline-block px-4 font-semibold text-white/90 text-lg hover:text-yellow-100 hover:text-xl"
                                            > {data.name}</a>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    {/*navbar right section*/}
                    <div className="relative group hidden lg:block pt-3 -mr-11 gap-2">
                        <button className="border-2 w-[110px] h-[45px] rounded-2xl text-lg font-semibold text-yellow-200 hover:bg-gray-200 hover:text-black mr-4">Login</button>
                        <button className="bg-slate-600 w-[125px] h-[45px] rounded-2xl text-lg font-semibold text-yellow-200 hover:bg-gray-200 hover:text-black">SignUp</button>
                        
                    </div> 
                    <div onClick={openNav} className='flex lg:hidden text-white'>
                        <Bars3Icon className='w-[3rem] lg:hidden h-[3rem] cursor-pointer text-yellow-200 -mr-12 mt-3'/>
                    </div>                   
                </motion.div>
                
            </div>
        </div>
        <hr/>
    </>
};

export default Navbar;