"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if there's a token in localStorage
    const token = localStorage.getItem("token");

    // Check if the current path is /admin
    const isAdminRoute = pathname === "/admin";

    // Set isAuthenticated to true if there's a token or if we're on the admin route
    setIsAuthenticated(!!token || isAdminRoute);

    // If we're on the admin route and there's no token, set one
    if (isAdminRoute && !token) {
      localStorage.setItem("token", "admin_access");
    }
  }, [pathname]);

  const goToLoginHandler = () => {
    router.push("/Login");
  };

  const logoutHandler = async () => {
    try {
      const response = await axios.get("/api/logout");
      console.log("Logout response:", response);
      if (response.status === 200) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        router.push("/Login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-blue-600 text-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">IT Solutions</Link>
        </div>
        <nav className="space-x-6 flex items-center">
          <Link href="/">Home</Link>
          {isAuthenticated && <Link href="/admin">Admin</Link>}
          <Link href="/about">About Us</Link>
          <Link href="/services">Services</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/career">Career</Link>

          {isAuthenticated ? (
            <button
              onClick={logoutHandler}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Admin Logout
            </button>
          ) : (
            <Link href="/Login">
              <button
                className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-400"
                onClick={goToLoginHandler}
              >
                Admin Login
              </button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
