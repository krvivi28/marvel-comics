import DoneIcon from "@mui/icons-material/Done";
import { useFilter } from "../../context/FilterContext";
import { useSearch } from "../../context/SearchContext";

interface IPropsProfile {
  data: any;
  setPage: any;
}
const Character = (props: IPropsProfile) => {
  const { data, setPage } = props;

  const { selectedCharcterIds, setSelectedCharcterIds, setIsFiltering } =
    useFilter();

  const { setSearchInput, setIsSearching } = useSearch();

  const handleCharacterClick = (id: any) => {
    setPage(1);
    setSearchInput("");
    setIsSearching(false);
    if (selectedCharcterIds.includes(id)) {
      const updatedState = selectedCharcterIds.filter((currIndex: any) => {
        return currIndex !== id;
      });
      if (updatedState.length > 0) {
        setTimeout(() => {
          setIsFiltering(true);
        }, 500);
      } else {
        setTimeout(() => {
          setIsFiltering(false);
        }, 500);
      }
      setSelectedCharcterIds(updatedState);
    } else {
      setSelectedCharcterIds((prev: any) => {
        setIsFiltering(true);
        return [...prev, id];
      });
    }
  };

  const selectedStyle = "border border-2 border-red-600";

  const checkIfSelected = () => {
    if (selectedCharcterIds.includes(data.id)) {
      return true;
    }
    return false;
  };

  const getCharacterImage = () => {
    if (data?.thumbnail?.path) {
      return data?.thumbnail?.path + `.${data?.thumbnail?.extension}`;
    }
    return "https://mir-s3-cdn-cf.behance.net/project_modules/hd/d8d80a51766659.58f8feb30d642.jpg";
  };

  return (
    <div
      className="relative cursor-pointer"
      onClick={() => handleCharacterClick(data.id)}
    >
      <img
        className={`${checkIfSelected() ? selectedStyle : ""}`}
        style={{
          borderRadius: "50%",
          width: "100px",
          height: "100px",
          cursor: "pointer",
        }}
        src={getCharacterImage()}
        alt=""
      />
      {checkIfSelected() && (
        <DoneIcon
          sx={{
            color: "green",
            fontSize: "75px",
            fontWeight: "bold",
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        />
      )}
    </div>
  );
};

export default Character;
