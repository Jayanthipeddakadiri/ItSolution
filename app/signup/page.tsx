"use client";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

interface AuthValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Page = () => {
  const router = useRouter();
  const [authValues, setAuthValues] = useState<AuthValues>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleAuthValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAuthValues({ ...authValues, [name]: value });
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (authValues.password !== authValues.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post("/api/register", {
        username: authValues.username,
        email: authValues.email,
        password: authValues.password,
      });
      if (res.status === 200 || res.status === 201) {
        router.push("/Login");
      } else {
        console.log("response data from register", res);
        alert(res.data.error);
      }
    } catch (err: any) {
      alert(err.response.data.error);
      // Handle registration error (e.g., show error message)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-600">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md transform transition-all hover:scale-105">
        <h2 className="text-4xl font-bold text-blue-600 text-center mb-8">
          Admin Signup
        </h2>
        <form onSubmit={onSubmitHandler} className="space-y-6">
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-blue-500" />
            <input
              type="text"
              name="username"
              value={authValues.username}
              onChange={handleAuthValueChange}
              className="w-full pl-10 pr-4 py-3 border-b-2 border-blue-300 focus:border-blue-500 transition-colors bg-transparent outline-none"
              placeholder="Username"
              required
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-blue-500" />
            <input
              type="email"
              name="email"
              value={authValues.email}
              onChange={handleAuthValueChange}
              className="w-full pl-10 pr-4 py-3 border-b-2 border-blue-300 focus:border-blue-500 transition-colors bg-transparent outline-none"
              placeholder="Email"
              required
            />
          </div>
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-blue-500" />
            <input
              type="password"
              name="password"
              value={authValues.password}
              onChange={handleAuthValueChange}
              className="w-full pl-10 pr-4 py-3 border-b-2 border-blue-300 focus:border-blue-500 transition-colors bg-transparent outline-none"
              placeholder="Password"
              required
            />
          </div>
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-blue-500" />
            <input
              type="password"
              name="confirmPassword"
              value={authValues.confirmPassword}
              onChange={handleAuthValueChange}
              className="w-full pl-10 pr-4 py-3 border-b-2 border-blue-300 focus:border-blue-500 transition-colors bg-transparent outline-none"
              placeholder="Confirm Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a
            href="/Login"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Page;
