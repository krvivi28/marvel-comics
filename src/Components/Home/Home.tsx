import { useQuery } from "@tanstack/react-query";
import Header from "../Header/Header";
import LinearProgress from "@mui/material/LinearProgress";
import Comics from "../Comics/Comics";
import { useMemo, useState } from "react";
import { useSearch } from "../../context/SearchContext";
import CharctersCarousel from "../Carousel/Carousel";
import { useFilter } from "../../context/FilterContext";
import Loader from "../Loader/Loader";
import Character from "../Character/Character";
import {
  fetchAllCharacters,
  fetchAllComics,
  fetchComicsByCharacterFilter,
  fetchComicsByTitle,
} from "../../apiServices/apiServices";
import Pagination from "../Pagination/Pagination";

function Home() {
  const [page, setPage] = useState(1);
  const { searchInput, isSearching } = useSearch();
  const { isFiltering, selectedCharcterIds } = useFilter();

  const { isLoading, data: comicsData } = useQuery({
    queryKey: ["comics", page],
    queryFn: () => fetchAllComics(page),
    staleTime: 10000,
  });

  const { isLoading: isSearchLoading, data: searchData } = useQuery({
    queryKey: ["searchComics", page, isSearching],
    queryFn: () => fetchComicsByTitle(searchInput, page),
  });

  const { isLoading: isCharactersLoading, data: charactersData } = useQuery({
    queryKey: ["charcterComics"],
    queryFn: () => fetchAllCharacters(),
  });

  const { isLoading: isFilterLoading, data: charactersFilterData } = useQuery({
    queryKey: ["charcterFilterComics", isFiltering, selectedCharcterIds, page],
    queryFn: () => fetchComicsByCharacterFilter(selectedCharcterIds, page),
  });

  const { data: totalComicsCount } = useQuery({
    queryKey: ["totalComicsCount"],
    queryFn: () => fetchAllComics(),
  });

  const handlePagination = (event: any, page: any) => {
    setPage(page);
  };

  const getPageCount = useMemo(() => {
    if (isSearching && searchData) {
      return searchData.total;
    }
    if (isFiltering && charactersFilterData) {
      return charactersFilterData.total;
    }
    if (comicsData) return comicsData.total;
    else return totalComicsCount ? totalComicsCount.total : 0;
  }, [isSearching, isFiltering, comicsData, charactersFilterData, searchData]);

  return (
    <div className="bg-[#000000ba] min-h-[100vh]">
      <Header setPage={setPage} />
      {(isLoading ||
        isSearchLoading ||
        isCharactersLoading ||
        isFilterLoading) && (
        <div>
          <LinearProgress
            sx={{
              backgroundColor: "white",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "red",
              },
            }}
            color="inherit"
          />
          <Loader />
        </div>
      )}

      <div className="min-h-full">
        <CharctersCarousel
          nodes={
            charactersData
              ? charactersData.results.map((charData: any) => {
                  return (
                    <Character
                      setPage={setPage}
                      key={charData.id}
                      data={charData}
                    />
                  );
                })
              : []
          }
          itemsCount={7}
        />
        {isSearching ? (
          <Comics
            data={searchData ? searchData.results : []}
            setPage={setPage}
            totalComics={searchData ? searchData.total : 0}
          />
        ) : isFiltering ? (
          <Comics
            data={charactersFilterData ? charactersFilterData.results : []}
            setPage={setPage}
            totalComics={charactersFilterData ? charactersFilterData.total : 0}
            charactersData={charactersData}
          />
        ) : (
          <Comics
            data={comicsData ? comicsData.results : []}
            setPage={setPage}
            totalComics={comicsData ? comicsData.total : 0}
          />
        )}
        <div className="flex items-center justify-center p-2 mb-5">
          <div className="bg-white p-1 rounded-md">
            <Pagination
              totalItems={getPageCount}
              perPageCount={8}
              onChange={handlePagination}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
