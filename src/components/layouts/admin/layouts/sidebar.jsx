import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useCompanyInfo } from "@/config/general";
import { useRouter } from "next/router";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  jobPostsRoutes,
  settingsRoutes,
  accessRightsRoutes,
} from "./sidebarapi";
import UserProfile from "@/components/userProfile/UserProfile";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Sidebar({ isOpen, setIsOpen }) {
  const t = useTranslations();
  const { companyName } = useCompanyInfo();
  const router = useRouter();
  const pathname = usePathname();
  const [userData, setUserData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const getBearerToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("access");
    }
    return null;
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsOpen]);

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const token = getBearerToken();
  //       if (!token) throw new Error("Missing access token");

  //       const res = await fetch(`${BASE_URL}personal-info/`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (!res.ok) {
  //         const errorText = await res.text();
  //         throw new Error("Failed to fetch profile: " + errorText);
  //       }

  //       const result = await res.json();
  //       if (Array.isArray(result) && result.length > 0) {
  //         const person = result[0];
  //         const fullName = `${person.first_name_en || ""} ${person.middle_name_en || ""} ${person.last_name_en || ""}`.trim();
  //         setUserData({
  //           email: fullName,
  //           role: "Admin",
  //           profileImage: "/default-avatar.png",
  //         });
  //       }
  //     } catch (err) {
  //       console.error("Error fetching profile:", err);
  //     }
  //   };

  //   fetchProfile();
  // }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    router.push("/auth/login");
  };

  const renderNavSection = (title, routes) => (
    <>
      {isOpen && (
        <li className=" user-select-none uppercase text-sm mb-1 text-gray-400 font-semibold">
          {title}
        </li>
      )}
      {routes.map(({ name, icon: Icon, link }) => {
        const isActive = pathname === link;
        return (
          <li key={name} className="mb-3 flex items-center group">
            <Link
              href={link}
              className={`block w-full p-2 rounded flex items-center transition-colors 
                ${isActive ? "bg-[#5B73E8] text-white" : "hover:bg-[#5B73E8] hover:text-white"}`}
            >
              <Icon size={20} className="mr-2" />
              <span className={`${isOpen ? "block" : "hidden"} ml-2`}>
                {t(name)}
              </span>
            </Link>
          </li>
        );
      })}
    </>
  );

  return (
    <div className="border-r-[1px] border-gray-300">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 ease-in-out
        ${isOpen ? "w-64" : isMobile ? "-translate-x-full w-64" : "w-20"}
        sm:relative sm:flex
        bg-white text-[#344054] p-4 transform`}
      >
        <aside className="flex flex-col h-full overflow-hidden">
          {/* Company Name */}
          <div className="flex-shrink-0 text-center">
            <h2 className="text-xl text-[#5B73E8] font-bold truncate">
              {isOpen ? companyName : companyName.charAt(0).toUpperCase()}
            </h2>
          </div>

          {/* Divider */}
          <div className="border-b border-gray-300 my-4 flex-shrink-0"></div>

          {/* User Profile */}
          {isOpen && userData && (
            <div className="mb-4">
              <UserProfile user={userData} onLogout={handleLogout} userType="admin"/>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-grow overflow-y-auto">
            <ul>
              {renderNavSection("Main", jobPostsRoutes)}
              {renderNavSection("Settings", settingsRoutes)}
              {renderNavSection("User Control", accessRightsRoutes)}
            </ul>
          </nav>
        </aside>
      </div>

      {/* Backdrop on mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}
