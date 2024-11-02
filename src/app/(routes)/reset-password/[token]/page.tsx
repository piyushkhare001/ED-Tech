"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ResetPasswordProps {
  params: {
    token: string;
  };
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ params }) => {
  const router = useRouter();
  const token = params.token; // Get the token from the URL
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const validatePassword = (password: string) => {
    const minLength = 8;

    // Regex patterns for validation
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChars = /[!@#$%^&*]/.test(password);

    // Validate password length
    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long.`;
    }
    // Validate the presence of uppercase letters
    if (!hasUpperCase) {
      return 'Password must contain at least one uppercase letter.';
    }
    // Validate the presence of lowercase letters
    if (!hasLowerCase) {
      return 'Password must contain at least one lowercase letter.';
    }
    // Validate the presence of special characters
    if (!hasSpecialChars) {
      return 'Password must contain at least one special character.';
    }

    return null; // Password is valid
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the password
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return; // Prevent proceeding if there's a validation error
    }

    if (!token || typeof token !== 'string') {
      setError('Invalid or expired token.');
      return;
    }

    try {
      const response = await fetch('/api/reset/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      const res = await response.json();
      if (response.ok) {
        setSuccess('Password reset successful! You can now log in.');
        setPassword('');
        router.push('/signin');
      } else {
        setError(res.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setError('Failed to reset password. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-lg w-full h-80 bg-gray-100 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Reset Your Password</h2>
        <form onSubmit={handleReset} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newPassword" className="text-gray-700">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {error && <div className="text-red-500 text-center">{error}</div>}
          {success && <div className="text-green-500 text-center">{success}</div>}
          <Button type="submit" className="w-full mt-8 bg-green-700 text-white font-semibold py-2 rounded-lg shadow hover:bg-green-800 transition duration-200">
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
