import Navbar from "./layouts/navbar";
import { useState } from "react";
import Sidebar from "./layouts/sidebar";
import Toast from "@/components/common/Toast";
import FilterSearch from "@/components/common/FilterSearch";

export default function CandidateLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex flex-col flex-1 mx-1 ">
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="container mx-auto flex-1">
          {/* SEARCH */}
          {/* <div className="mb-2 p-5 w-full bg-white flex justify-between items-center rounded shadow-md">
            <FilterSearch />
          </div> */}

          {/* CHILD */}
          <div className="bg-white p-6 rounded shadow-md mt-4">{children}</div>
        </main>
        <Toast />
      </div>
    </div>
  );
}
