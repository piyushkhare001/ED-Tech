"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signIn("sign-in", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/dashboard"); // Redirect to dashboard on success
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please try again.");
    }
  };

  const handleForgotPassword = () => {
    // Redirect to forgot password page
    router.push("/forgot-password");
  };

  const handleRegister = () => {
    // Redirect to sign-up page
    router.push("/signup");
  };

  return (
    <div>SignIn</div>
  )
}

export default SignIn;