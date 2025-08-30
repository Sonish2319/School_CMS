import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  jobPostsRoutes,
  settingsRoutes,
  accessRightsRoutes,
} from "./sidebarapi";
import UserProfile from "@/components/userProfile/UserProfile";

export default function Sidebar({ isOpen, setIsOpen }) {
  const router = useRouter();
  const pathname = usePathname();
  const [userData, setUserData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [openMenus, setOpenMenus] = useState({}); // Track expanded menus

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

  const handleLogout = () => {
    localStorage.removeItem("access");
    router.push("/auth/login");
  };

  const toggleMenu = (menuName) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const renderNavSection = (title, routes) => (
    <>
      {isOpen && (
        <li className="user-select-none uppercase text-sm mb-1 text-gray-400 font-semibold">
          {title}
        </li>
      )}
      {routes.map(({ name, icon: Icon, link, children }) => {
        const isActive = pathname === link;
        const hasChildren = Array.isArray(children) && children.length > 0;
        const isExpanded = openMenus[name] || false;

        return (
          <li key={name} className="mb-2">
            {hasChildren ? (
              <>
                {/* Parent Item */}
                <div
                  onClick={() => toggleMenu(name)}
                  className={`flex items-center px-2 py-2 rounded cursor-pointer select-none
                    ${isOpen ? "justify-between" : "justify-center"}
                    ${children.some((child) => pathname === child.link)
                      ? "bg-[#5B73E8] text-white"
                      : "hover:bg-[#5B73E8] hover:text-white"}
                  `}
                >
                  <div className="flex items-center">
                    <Icon size={20} className="mr-2" />
                    {isOpen && <span>{name}</span>}
                  </div>
                  {isOpen && (
                    <span className="ml-auto transition-transform duration-300">
                      {isExpanded ? "▾" : "▸"}
                    </span>
                  )}
                </div>

                {/* Child Items with animation */}
                <ul
                  className={`overflow-hidden transition-all duration-300 ease-in-out
                    ${isExpanded ? "max-h-[500px] opacity-100 mt-1" : "max-h-0 opacity-0"}
                    ${isOpen ? "ml-6" : "hidden"}
                  `}
                >
                  {children.map(
                    ({ name: childName, icon: ChildIcon, link: childLink }) => {
                      const isChildActive = pathname === childLink;
                      return (
                        <li key={childName} className="mb-1">
                          <Link
                            href={childLink}
                            className={`flex items-center px-2 py-1 rounded text-sm
                              ${isChildActive
                                ? "bg-[#5B73E8] text-white"
                                : "hover:bg-[#5B73E8] hover:text-white"}`}
                          >
                            <ChildIcon size={16} className="mr-2" />
                            {childName}
                          </Link>
                        </li>
                      );
                    }
                  )}
                </ul>
              </>
            ) : (
              <Link
                href={link}
                className={`block p-2 rounded flex items-center transition-colors 
                  ${isActive
                    ? "bg-[#5B73E8] text-white"
                    : "hover:bg-[#5B73E8] hover:text-white"}`}
              >
                <Icon size={20} className="mr-2" />
                <span className={`${isOpen ? "block" : "hidden"} ml-2`}>
                  {name}
                </span>
              </Link>
            )}
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
              {isOpen ? "Company" : "C"}
            </h2>
          </div>

          {/* Divider */}
          <div className="border-b border-gray-300 my-4 flex-shrink-0"></div>

          {/* User Profile */}
          {isOpen && userData && (
            <div className="mb-4">
              <UserProfile
                user={userData}
                onLogout={handleLogout}
                userType="admin"
              />
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
