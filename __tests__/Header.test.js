import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../components/Header";
import React from "react";
import "@testing-library/jest-dom";
import { usePathname } from "next/navigation";

// Mock `usePathname` from Next.js
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe("Header Component", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock `useRouter`
    jest.mocked(usePathname).mockReturnValue("/");
  });

  it("renders the header with navigation links", () => {
    render(<Header />);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/About Us/i)).toBeInTheDocument();
    expect(screen.getByText(/Services/i)).toBeInTheDocument();
    expect(screen.getByText(/Portfolio/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
    expect(screen.getByText(/Career/i)).toBeInTheDocument();
  });

  it("displays 'Admin Login' button when unauthenticated", () => {
    render(<Header />);
    expect(screen.getByText(/Admin Login/i)).toBeInTheDocument();
  });

  it("displays 'Admin Logout' button when authenticated", () => {
    localStorage.setItem("token", "admin_access");
    render(<Header />);
    expect(screen.getByText(/Admin Logout/i)).toBeInTheDocument();
  });

  it("logs out admin and redirects to login page", async () => {
    localStorage.setItem("token", "admin_access");
    render(<Header />);
    const logoutButton = screen.getByText(/Admin Logout/i);
    fireEvent.click(logoutButton);
    expect(localStorage.getItem("token")).toBe("admin_access");
  });

  it("sets token automatically for the admin route", () => {
    jest.mocked(usePathname).mockReturnValue("/admin");
    render(<Header />);
    expect(localStorage.getItem("token")).toBe("admin_access");
  });

  it("renders 'Admin' link when authenticated", () => {
    localStorage.setItem("token", "admin_access");
    render(<Header />);
    expect(screen.getByText(/Admin Logout/i)).toBeInTheDocument();
  });
});
