import { useQuery } from "@tanstack/react-query";
import Header from "../Header/Header";
import { baseUrl, getAuthKey } from "../../contants/appConstants";
import LinearProgress from "@mui/material/LinearProgress";
import Comics from "../Comics/Comics";
import { useState } from "react";
import { useSearch } from "../../context/SearchContext";
import CharctersCarousel from "../Characters/CharctersCarousel";
import { useFilter } from "../../context/FilterContext";

function Home() {
  const [page, setPage] = useState(1);
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

  // console.log(isLoading, error, comicsData);

  return (
    <>
      <Header />
      {(isLoading ||
        isSearchLoading ||
        isCharactersLoading ||
        isFilterLoading) && (
        <LinearProgress
          sx={{
            backgroundColor: "white",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "red",
            },
          }}
          color="inherit"
        />
      )}
      <CharctersCarousel data={charactersData ? charactersData.results : []} />
      {isSearching && (
        <Comics
          data={searchData ? searchData.results : []}
          setPage={setPage}
          totalComics={searchData ? searchData.total : 0}
        />
      )}
      {isFiltering && (
        <Comics
          data={charactersFilterData ? charactersFilterData.results : []}
          setPage={setPage}
          totalComics={charactersFilterData ? charactersFilterData.total : 0}
          charactersData={charactersData}
        />
      )}
      {!isFiltering && !isSearching && (
        <Comics
          data={comicsData ? comicsData.results : []}
          setPage={setPage}
          totalComics={comicsData ? comicsData.total : 0}
        />
      )}
    </>
  );
}

export default Home;
