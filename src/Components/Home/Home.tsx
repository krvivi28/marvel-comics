import { useQuery } from "@tanstack/react-query";
import Header from "../Header/Header";
import { baseUrl, getAuthKey } from "../../contants/appConstants";
import LinearProgress from "@mui/material/LinearProgress";
import Comics from "../Comics/Comics";
import { useEffect, useMemo, useState } from "react";
import { useSearch } from "../../context/SearchContext";
import CharctersCarousel from "../Characters/CharctersCarousel";
import { useFilter } from "../../context/FilterContext";
import Loader from "../Loader/Loader";
import { Pagination } from "@mui/material";

function Home() {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const { searchInput, isSearching } = useSearch();
  const { isFiltering, selectedCharcterIds } = useFilter();

  const fetchAllComics = async () => {
    const url =
      baseUrl + "/v1/public/comics" + getAuthKey() + `&limit=8&offset=${page}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    return data.data;
  };

  const fetchComicsByTitle = async () => {
    const url =
      baseUrl +
      "/v1/public/comics" +
      getAuthKey() +
      `&titleStartsWith=${searchInput}&limit=8&offset=${page}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.data;
  };

  const fetchAllCharacters = async () => {
    const url = baseUrl + "/v1/public/characters" + getAuthKey();
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    return data.data;
  };

  const fetchComicsByCharacterFilter = async () => {
    const url =
      baseUrl +
      "/v1/public/comics" +
      getAuthKey() +
      `&characters=${selectedCharcterIds}&limit=8&offset=${page}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    return data.data;
  };

  const {
    isLoading,
    error,
    data: comicsData,
  } = useQuery({
    queryKey: ["comics", page],
    queryFn: fetchAllComics,
    // staleTime: 10000,
  });

  const { isLoading: isSearchLoading, data: searchData } = useQuery({
    queryKey: ["searchComics", searchInput, page, isSearching],
    queryFn: fetchComicsByTitle,
  });

  const { isLoading: isCharactersLoading, data: charactersData } = useQuery({
    queryKey: ["charcterComics"],
    queryFn: fetchAllCharacters,
  });

  const { isLoading: isFilterLoading, data: charactersFilterData } = useQuery({
    queryKey: ["charcterFilterComics", isFiltering, selectedCharcterIds, page],
    queryFn: fetchComicsByCharacterFilter,
  });

  const handlePagination = (event: any, page: any) => {
    setPage(page);
    console.log("Currently selected page:", page);
  };

  useEffect(() => {
    if (isSearching) {
      searchData ? setPageCount(searchData.total) : setPageCount(0);
    }
    if (isFiltering) {
      charactersFilterData
        ? setPageCount(charactersFilterData.total)
        : setPageCount(0);
    }
    comicsData ? setPageCount(comicsData.total) : 0;
  }, [comicsData, searchData, charactersFilterData]);

  const getPageCount = useMemo(() => {
    return pageCount;
  }, [pageCount]);

  // console.log(isLoading, error, comicsData);

  return (
    <div className="bg-[#000000ba] min-h-[100vh]">
      <Header />
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
          data={charactersData ? charactersData.results : []}
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
        {/* <div className="flex items-center justify-center p-2 mb-5">
          <div className="bg-white p-1 rounded-md">
            <Pagination
              count={Math.floor(getPageCount / 8)}
              variant="outlined"
              shape="rounded"
              onChange={(event, pageNumber) =>
                handlePagination(event, pageNumber)
              }
            />
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Home;
