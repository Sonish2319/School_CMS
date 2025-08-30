"use client";

import { useRouter } from "next/router";
import { FaTimes, FaBars } from "react-icons/fa";
import { LogOut } from "lucide-react";

export default function Navbar({ isOpen, setIsOpen }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("access");
    router.push("/auth/login");
  };

  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-white z-50 border-r border-b border-gray-300">
      {/* Sidebar toggle */}
      <div className="flex items-center gap-2 border border-blue-300 p-2 rounded-md">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-blue-600 focus:outline-none"
        >
          {isOpen ? <FaBars size={20} /> : <FaTimes size={20} />}
        </button>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-5">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 border border-blue-300 p-2 rounded-md text-blue-600 hover:bg-gray-50"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </nav>
  );
}
