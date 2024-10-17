'use client'
import { XMarkIcon } from '@heroicons/react/20/solid'
import React from 'react';
//mport Link from "next/link";



interface Props {
    nav:boolean;
    closeNav: () => void;
}

const MobileNav = ({nav,closeNav}: Props) => {

    const navAnimation = nav?'translate-x-0':'translate-x-[100%]'
  return (
    <div className={`fixed  ${navAnimation} transform transition-all duration-300 top-0 left-0 right-0 bottom-0 z-[10000] bg-slate-900`}>
        <div className='w-[100vw] h-[100vh] flex flex-col items-center justify-center'>
            <div>
                <ul className='text-yellow-50 font-bold text-3xl'>
                    <li className='pb-7 hover:text-yellow-300 hover:text-4xl transition-all duration-200 text-center'>Home</li>
                    <li className='pb-7 hover:text-yellow-300 hover:text-4xl transition-all duration-200 text-center'>About</li>
                    <li className='pb-7 hover:text-yellow-300 hover:text-4xl transition-all duration-200 text-center'>Courses</li>
                    <li className='pb-7 hover:text-yellow-300 hover:text-4xl transition-all duration-200 text-center'>Certificate</li>
                    <li className='pb-7 hover:text-yellow-300 hover:text-4xl transition-all duration-200 text-center'>Contact</li>
                </ul>
            </div>
            <div className='pt-7 flex flex-col gap-4'>
                    <button className="border-2 w-[140px] h-[52px] rounded-xl text-lg font-bold text-yellow-200 hover:bg-gray-200 hover:text-black transition-all duration-200">Login</button>
                    <button className="bg-slate-600 w-[140px] h-[52px] rounded-xl text-lg font-bold text-yellow-200 hover:bg-gray-200 hover:text-black transition-all duration-200">SignUp</button>
            </div>
        </div>
        <div onClick={closeNav} className='absolute cursor-pointer top-[3rem] right-[3rem] w-[3rem] h-[3rem] text-yellow-400'>
            <XMarkIcon/>
        </div>
    </div>
  )
}

export default MobileNav