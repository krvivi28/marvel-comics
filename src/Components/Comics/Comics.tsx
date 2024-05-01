import React from "react";
import ComicCard from "../Card/Card";
import "./comics.css";
import Pagination from "@mui/material/Pagination";
import { useSearch } from "../../context/SearchContext";
import Carousel from "../Characters/CharctersCarousel";
import { useFilter } from "../../context/FilterContext";

interface IPropsComics {
  data: [];
  setPage: any;
  totalComics: number;
  charactersData?: any;
}

const Comics = (props: IPropsComics) => {
  const { data, setPage, totalComics, charactersData } = props;
  const { searchInput, isSearching } = useSearch();
  const { selectedCharcterIds, setSelectedCharcterIds, setIsFiltering } =
    useFilter();

  const handlePagination = (event: any, page: any) => {
    setPage(page);
    console.log("Currently selected page:", page);
  };

  const getNamesOfSelectedCharcters = () => {
    // console.log("all data for filter", data);
    // console.log("selected characters selectedCharcterIds", selectedCharcterIds);
    const names: any = [];
    if (charactersData) {
      charactersData.results.map((char: any) => {
        if (selectedCharcterIds.includes(char.id)) {
          names.push(char.name);
        }
      });
    }
    return names;
  };

  return (
    <>
      <div
        id="comic"
        className="bg-[#000000ba] min-h-[77vh] flex flex-col items-center justify-between gap-2 pt-2"
      >
        <div className="flex items-center justify-start">
          <p className="text-white text-2xl font-semibold">
            {isSearching || searchInput ? "Search Results" : ""}
          </p>
        </div>

        {selectedCharcterIds.length > 0 && (
          <div className="flex items-center justify-between md:w-full md:px-[340px]">
            <p className="text-white text-xl font-semibold">
              Explore -{" "}
              {getNamesOfSelectedCharcters().map((name: any, index: any) => {
                return index === getNamesOfSelectedCharcters().length - 1
                  ? name
                  : name + ", ";
              })}
            </p>
            <button
              onClick={() => {
                setIsFiltering(false);
                setSelectedCharcterIds([]);
              }}
              className="px-4 py-1 rounded-md bg-white text-black"
            >
              clear all filters
            </button>
          </div>
        )}

        <div className="grid md:grid-cols-4 md:gap-2 px-5 md:px-[300px] mt-2">
          {data.map((comicData: any, index) => {
            return <ComicCard key={index} data={comicData} />;
          })}
        </div>

        <div className="flex items-center justify-center p-2 mb-5">
          <div className="bg-white p-1 rounded-md">
            <Pagination
              count={Math.floor(totalComics / 8)}
              variant="outlined"
              shape="rounded"
              onChange={(event, pageNumber) =>
                handlePagination(event, pageNumber)
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Comics;
