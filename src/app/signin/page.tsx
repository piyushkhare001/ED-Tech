
import { Button } from "@/@/components/ui/button";
import { Input } from "@/@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import React from "react";
import { FcGoogle } from 'react-icons/fc';
import login from '@/assets/login.jpg';

const SignIn =  () => {
  return(
    <div className="bg-[#26313c] h-screen flex items-center justify-center p-10">
        <div className="grid box-animate w-full h-full grid-cols-1 bg-white md:grid-cols-2">
          <div className="bg-[#16202a] text-white flex items-center justify-center flex-col">
            <div className="my-4">
              <h1 className="text-3xl font-semibold">Login</h1>
              <p className="mt-2 text-xs text-slate-400">
                {' '}
                See your Courses and updates</p>
            </div>

            <form>
              <button className="flex items-center mb-4 gap-4 px-12 bg-slate-900 w-[270px] h-10 rounded-full border-2 bg-transparent">
                <FcGoogle />
                Sign In with google
              </button>
              <Label htmlFor="email">Email*</Label>
              <Input 
                className="mt-2 mb-4 bg-transparent rounded-full " 
                type="email" 
                id="email" 
                placeholder="Email"
              />

              <Label htmlFor="email">Password*</Label>
              <Input 
                className="mt-2 mb-4 bg-transparent rounded-full " 
                type="password" 
                id="password" 
                placeholder="Password"
              />

              <Button type="submit" className="w-full mt-6 bg-indigo-600 rounded-full hover:bg-indigo-700">
                Login
              </Button>

            </form>
            <p className="mt-4 text-xs text-slate-200">
              @2024 All rights reserved
            </p>
          </div>
          <div className="relative hidden md:block">
            <Image className="object-cover" fill={true}
            src={login}
            alt="Login background img"
            />
          </div>
        </div>
    </div>
  )
};


export default SignIn;