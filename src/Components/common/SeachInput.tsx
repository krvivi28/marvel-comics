import React from "react";
import { useSearch } from "../../context/SearchContext";

const SeachInput = () => {
  const { setIsSearching, searchInput, setSearchInput } = useSearch();

  const handleOnChange = (e: any) => {
    console.log(e.target.value);
    setTimeout(() => {
      setIsSearching(true);
      setSearchInput(e.target.value);
    }, 1000);
  };

  const resetSearchState = () => {
    console.log("focus out");
    if (searchInput.trim().length === 0 || searchInput.trim() === "") {
      setTimeout(() => {
        setIsSearching(false);
        setSearchInput("");
      }, 500);
    }
  };

  return (
    <>
      <div className="relative w-1/3">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-2 focus:border-red-600 outline-none ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          placeholder="Search for comics..."
          required
          onChange={handleOnChange}
          onBlur={resetSearchState}
        />
      </div>
    </>
  );
};

export default SeachInput;
