import ComicCard from "./Card/Card";
import "./comics.css";
import { useSearch } from "../../context/SearchContext";
import { useFilter } from "../../context/FilterContext";
import spinner from "../../assets/gifs/spinner.gif";

interface IPropsComics {
  data: [];
  setPage: any;
  totalComics: number;
  charactersData?: any;
}

const Comics = (props: IPropsComics) => {
  const { data, charactersData } = props;
  const { searchInput, isSearching } = useSearch();
  const { selectedCharcterIds, setSelectedCharcterIds, setIsFiltering } =
    useFilter();

  const getNamesOfSelectedCharcters = () => {
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

  const getMinHeight = () => {
    return isSearching ? "572px" : "570px";
    // style={{ minHeight: getMinHeight() }}
  };

  return (
    <>
      <div
        style={{ minHeight: getMinHeight() }}
        id="comic"
        className="flex flex-col items-center justify-start gap-2 p-2"
      >
        {data.length > 0 && (
          <div className="flex items-center justify-start">
            <p className="text-white text-2xl font-semibold">
              {isSearching || searchInput ? "Search Results" : ""}
            </p>
          </div>
        )}

        {selectedCharcterIds.length > 0 && data.length > 0 && (
          <div className="flex items-center justify-between md:w-full md:px-[340px]">
            <p className="text-white text-md font-semibold">
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

        {data.length > 0 ? (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 md:gap-2 px-5 lg:px-[300px] mt-2">
            {data.map((comicData: any, index) => {
              return <ComicCard key={index} data={comicData} />;
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <div>
              <img width={100} src={spinner} alt="" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Comics;
