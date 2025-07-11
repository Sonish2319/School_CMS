import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const [searchQueries, setSearchQueries] = useState({});

  const setSearchQuery = (module, query) => {
    setSearchQueries((prev) => ({
      ...prev,
      [module]: query,
    }));
  };

  console.log("Current searchQuery:", searchQueries);

  const getSearchQuery = (module) => {
    return searchQueries[module] || "";
  };

  return (
    <SearchContext.Provider value={{ searchQueries, setSearchQuery, getSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);

