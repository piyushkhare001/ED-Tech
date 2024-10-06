"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const router = useRouter();

  const handleSendOtp = async () => {
    try {
      const response = await fetch("/api/auth/signup/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setOtpSent(true);
      } else {
        const data = await response.json();
        setError(data.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, otp }),
      });

      if (response.ok) {
        router.push("/signin");
      } else {
        const data = await response.json();
        setError(data.message || "An error occurred during sign up.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div>Signup</div>
  )
}

export default Signup
