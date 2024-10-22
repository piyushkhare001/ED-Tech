"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function SignIn() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("sign-in", {
        email: formData.email,
        password: formData.password,
        role: formData.role,
        redirect: false,
      });

      if (result?.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
        return;
      }

      // Redirect based on role
      switch (formData.role) {
        case "student":
          router.push("/dashboard/student");
          break;
        case "studentPartner":
          router.push("/dashboard/partner");
          break;
        case "organizationRepresentative":
          router.push("/dashboard/organization");
          break;
        default:
          router.push("/dashboard");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred during sign in",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200/80">
      <div className="mx-auto max-w-[1200px] p-4 h-screen flex items-center">
        <div className="w-full flex shadow-lg rounded-lg overflow-hidden bg-white">
          <div className="hidden md:flex md:w-1/2 bg-emerald-500 p-12 flex-col text-white relative">
            <div className="max-w-md">
              <h2 className="text-3xl font-medium leading-tight mb-6">
                Discover world best online courses here. 24k online course is
                waiting for you
              </h2>
              <div className="mt-8">
                <Image
                  src="/images/authBanner.png"
                  alt="Student studying"
                  width={300}
                  height={300}
                  priority
                  className="mx-auto z-10 h-auto w-auto"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Sign in form */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <div className="max-w-[400px] mx-auto">
              <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                  Sign In
                </h1>
                <p className="text-gray-600">
                  New User?{" "}
                  <Link
                    href="/signup"
                    className="text-emerald-600 hover:text-emerald-500"
                  >
                    Create an Account
                  </Link>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    placeholder="Enter your Email"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    placeholder="Enter your Password"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Select Role <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) =>
                      setFormData({ ...formData, role: value })
                    }
                  >
                    <SelectTrigger className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="studentPartner">
                        Student Partner
                      </SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="organizationRepresentative">
                        Organization Representative
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-emerald-600 hover:text-emerald-500"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 disabled:opacity-70"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
