import React, { useState } from "react";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/router";

const USERTYPES = ["Climber", "Artisan"];

export default function Signup({
  setUserData,
}: {
  setUserData: (data: any) => void;
}) {
  const [email, setEmail] = useState("haridas@gmail.com");
  const [password, setPassword] = useState("asdfghjkl;'");
  const [name, setName] = useState("karuto");
  const [userType, setUserType] = useState(USERTYPES[0]);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserData({
      isLoggedIn: true,
      name,
      email,
      password,
      userType,
    });
    router.push(`/${userType}`);
    // Handle authentication logic here
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-md mx-auto pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg sm:px-10">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              {" "}
              Create Your Account{" "}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {" "}
              Get started with automatic lecture transcription{" "}
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 text-gray-900 p-2 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 p-2 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md py-2 text-gray-900 leading-6"
                />
              </div>
            </div>
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 p-2 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md py-2 text-gray-900 leading-6"
                />
              </div>
            </div>
            {/* User Type */}
            <div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  User Type
                </label>
                <div className="mt-2 flex space-x-4">
                  {USERTYPES.map((type) => (
                    <div key={type} className="flex items-center">
                      <input
                        id={type}
                        name="userType"
                        value={type}
                        type="radio"
                        onChange={(e) =>
                          setUserType(e.target.value.toLowerCase())
                        }
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 bg-blue-600"
                        required
                      />
                      <label
                        htmlFor={type}
                        className="ml-2 block text-sm font-medium text-gray-700"
                      >
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Submit */}
            <div>
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="absolute right-3 inset-y-0 flex items-center">
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                Create Account
              </Button>
            </div>
          </form>

          <Link href="/signin">
            <button className="mt-6 ml-12 text-sm text-blue-600 hover:text-blue-500">
              Already have an account? Sign in
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
