import React, { useContext } from "react";
import { createContext, useState } from "react";

interface FilterContextType {
  selectedCharcterIds: any[];
  setSelectedCharcterIds: any;
  isFiltering: boolean;
  setIsFiltering: any;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

const FilterContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedCharcterIds, setSelectedCharcterIds] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  return (
    <>
      <FilterContext.Provider
        value={{
          selectedCharcterIds,
          setSelectedCharcterIds,
          isFiltering,
          setIsFiltering,
        }}
      >
        {children}
      </FilterContext.Provider>
    </>
  );
};

export default FilterContextProvider;

export const useFilter = () => {
  return useContext(FilterContext);
};
