import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useCompanyInfo } from "@/config/general";
import { FaTimes, FaBars } from "react-icons/fa";
import Link from "next/link";
import {
  jobPostsRoutes,
  settingsRoutes,
  accessRightsRoutes,
} from "./sidebarapi";

export default function Sidebar({ isOpen, setIsOpen }) {
  const t = useTranslations();
  const { companyName } = useCompanyInfo();

  // Automatically handle sidebar state on screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false); // Compress on small screens
      } else {
        setIsOpen(true); // Expand on larger screens
      }
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setIsOpen]);

  const toggleSidebar = () => setIsOpen(prev => !prev);

  return (
    <div
      className={`transition-all duration-300 ease-in-out h-auto ${isOpen
        ? " bg-blue-900 text-white p-5"
        : "w-24 bg-blue-900 text-white p-2"
        }`}
    >
      {/* Toggle Sidebar Button */}
      {/* <button
        onClick={toggleSidebar}
        className="bg-blue-800 text-white p-2 rounded mb-4 w-full flex items-center justify-center border-2 border-amber-300"
      >
        {isOpen ? (
          <FaTimes className="text-white" size={20} />
        ) : (
          <FaBars className="text-white" size={20} />
        )}
      </button> */}

      {/* Sidebar Content */}
      <aside className="flex flex-col">
        {/* Company Logo or Name */}
        <div
          className="mt-5 mb-10 flex-shrink-0 hidden sm:block"
        // Hide on small screens
        >
          <h2
            className={`text-xl font-bold ${isOpen ? "truncate" : "text-center"
              }`}
          >
            {isOpen ? companyName : companyName.charAt(0).toUpperCase()}
          </h2>
        </div>

        {/* Divider */}
        <div
          className={`border-b border-gray-500 my-4 flex-shrink-0 hidden sm:block ${isOpen ? "" : "hidden"
            }`}
        ></div>

        {/* Navigation */}
        <nav className="flex-grow">
          <ul>
            {/* Job Posts Section */}
            {jobPostsRoutes.map(({ name, icon: Icon, link }) => (
              <li key={name} className="mb-3 flex items-center group">
                <Link href={link}>
                  <span
                    className={`block p-2 rounded hover:bg-blue-700 flex items-center ${isOpen ? "truncate" : "justify-center"
                      }`}
                  >
                    <Icon size={20} className="mr-2" />
                    <span
                      className={`ml-2 ${isOpen ? "" : "hidden"}`}
                    >
                      {isOpen && t(name)}
                    </span>
                  </span>
                </Link>
              </li>
            ))}

            {/* Settings Section */}
            {settingsRoutes.map(({ name, icon: Icon, link }) => (
              <li key={name} className="mb-3 flex items-center group">
                <Link href={link}>
                  <span
                    className={`block p-2 rounded hover:bg-blue-700 flex items-center ${isOpen ? "truncate" : "justify-center"
                      }`}
                  >
                    <Icon size={20} className="mr-2" />
                    <span
                      className={`ml-2 ${isOpen ? "" : "hidden"}`}
                    >
                      {isOpen && t(name)}
                    </span>
                  </span>
                </Link>
              </li>
            ))}

            {/* Access Rights Section */}
            {accessRightsRoutes.map(({ name, icon: Icon, link }) => (
              <li key={name} className="mb-3 flex items-center group">
                <Link href={link}>
                  <span
                    className={`block p-2 rounded hover:bg-blue-700 flex items-center ${isOpen ? "truncate" : "justify-center"
                      }`}
                  >
                    <Icon size={20} className="mr-2" />
                    <span
                      className={`ml-2 ${isOpen ? "" : "hidden"}`}
                    >
                      {isOpen && t(name)}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
