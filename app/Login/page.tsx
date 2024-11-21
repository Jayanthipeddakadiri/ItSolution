"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";

interface LoginAuth {
  email: string;
  password: string;
}

const Page = () => {
  const route = useRouter();
  const [authValues, setAuthValues] = useState<LoginAuth>({
    email: "",
    password: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthValues({ ...authValues, [name]: value });
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/login", authValues);
      if (res.status === 200 || res.status === 201) {
        setAuthValues({ email: "", password: "" });
        localStorage.setItem("token", res.data.token);
        route.push("/admin");
      } else {
        alert(res.data.error);
      }
    } catch (error: any) {
      alert(error.response.data.error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-600">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md transform transition-all hover:scale-105">
        <h2 className="text-4xl font-bold text-blue-600 text-center mb-8">
          Welcome Back Admin
        </h2>
        <form onSubmit={onSubmitHandler} className="space-y-6">
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-blue-500" />
            <input
              type="email"
              name="email"
              value={authValues.email}
              onChange={onChangeHandler}
              className="w-full pl-10 pr-4 text-black py-3 border-b-2 border-blue-300 focus:border-blue-500 transition-colors bg-transparent outline-none"
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
              onChange={onChangeHandler}
              className="w-full pl-10 text-black pr-4 py-3 border-b-2 border-blue-300 focus:border-blue-500 transition-colors bg-transparent outline-none"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Log In
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Page;
