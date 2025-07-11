import { useRouter } from "next/router";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { FaTimes, FaBars } from "react-icons/fa";
import { toast } from "react-toastify";
import { LogOut } from "lucide-react";
import FilterSearch from "@/components/common/FilterSearch.jsx";

export default function Navbar({ isOpen, setIsOpen }) {
  const { switchLanguage, locale } = useLanguage();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("access");
    router.push("/auth/login");
  };

  const showToast = () => {
    toast.warning("This is a warning message!");
  };

  const handleLocaleChange = () => {
    switchLanguage();
    localStorage.setItem("locale", locale === "en" ? "np" : "en");
    router.push(router.pathname, router.asPath, {
      locale: locale === "en" ? "np" : "en",
    });
  };

  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-white z-50 border-r-[1px] border-b-[1px] border-gray-300">
      <div className="flex items-center gap-2 border-[1px] border-blue-300 p-2 rounded-[5px]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-blue-600 focus:outline-none"
        >
          {isOpen ? <FaBars size={20} /> : <FaTimes size={20} />}
        </button>
        {/* <FilterSearch /> */}
      </div>

      <div className="flex items-center gap-[20px]">
        <button
          onClick={handleLocaleChange}
          className="px-2 text-[20px] font-normal text-blue-600 bg-white border-[1px] border-blue-300 rounded-[5px] hover:bg-gray-100"
        >
          {locale === "en" ? "🇳🇵" : "🇬🇧"}
        </button>

        <button
          onClick={showToast}
          className="text-blue-600 text-[16px] font-normal border-[1px] border-blue-300 rounded-[5px] px-2 hover:bg-gray-100 py-1"
        >
          Show Toast
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 border-[1px] border-blue-300 p-2 rounded-[5px] text-blue-600"
        >
          <LogOut size={18} /> 
        </button>
      </div>
    </nav>
  );
}