"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import { Button } from "src/components/ui/button";
import signupimg from "src/assets/signupimg.webp"
import Image from "next/image";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    // Simple validation (You can enhance this)
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Perform signup logic here (send to backend)
    console.log("Form submitted:", formData);

    // Clear form or redirect on successful submission
  };

  return (
    <div className="bg-[#26313c] h-screen flex items-center justify-center p-10">
      <div className="grid box-animate w-full h-full grid-cols-1 bg-white md:grid-cols-2">
        <div className="bg-[#16202a] text-white flex items-center justify-center flex-col">
            <div className="my-4">
              <h1 className="text-3xl font-semibold">Sign Up</h1>
              <p className="mt-2 text-xs text-slate-400">
                {' '}
              Welcome to DESIZNIDEAZ</p>
            </div>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name*</Label>
              <Input
                className="bg-transparent mt-2 mb-4 w-[250px]"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email*</Label>
              <Input
                className="mt-2 mb-4 bg-transparent w-[250px]"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password*</Label>
              <Input
                className="bg-transparent mt-2 mb-4 w-[250px]"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>
            <div>
              <Label htmlFor="confirm password">Confirm Password*</Label>
              <Input
                className="bg-transparent mt-2 mb-4 w-[250px]"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            >
              Sign Up
            </Button>
          </form>
          <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <a href="/Login" className="text-indigo-600 hover:underline">
              Log in
            </a>
          </p>
        </div>
        <div className="relative hidden md:block">
          <Image className="object-cover" fill={true}
          src={signupimg}
          alt="Signup background image"/>
        </div>
      </div>
    </div>
  );
};

export default Signup;
