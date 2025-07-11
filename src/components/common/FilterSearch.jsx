import { useState } from "react";
import { useSearchContext } from "@/context/SearchContext";
import { FaSearch } from "react-icons/fa";

export default function FilterSearch() {
  const { setSearchQuery } = useSearchContext();
  const [inputValue, setInputValue] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(inputValue);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search..."
        className="w-64 p-1 rounded-l border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="p-2 bg-white text-white rounded-r hover:bg-blue-600 flex items-center justify-center"
      >
        <FaSearch size={18} className="text-blue-600" />
      </button>
    </form>
  );
}
