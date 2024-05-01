import React, { useContext } from "react";
import { createContext, useState } from "react";

interface SearchContextType {
  isSearching: boolean;
  setIsSearching: any;
  searchInput: string;
  setSearchInput: any;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  return (
    <>
      <SearchContext.Provider
        value={{ isSearching, setIsSearching, searchInput, setSearchInput }}
      >
        {children}
      </SearchContext.Provider>
    </>
  );
};

export default SearchContextProvider;

export const useSearch = () => {
  return useContext(SearchContext);
};
