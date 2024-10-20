"use client";

import { Button } from '@/components/ui/button';
import  {Input}  from '@/components/ui/input';
import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      setSuccess(null);
      return;
    }

    // If email is valid, proceed (you can implement actual API call here)
    setError(null);
    setSuccess('Password reset link has been sent to your email address.');
    setEmail('');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#26313c] p-4">
      <div className="w-[420px] h-[320px] max-w-md space-y-6 bg-[#16202a] p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center text-white pt-7">
          Forgot Password?
        </h2>
        <p className="text-center text-sm text-gray-300">
          Enter your email to reset your password.
        </p>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-300"
            />
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            >
              Send Reset Link
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
