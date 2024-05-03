import Home from "./Components/Home/Home";
import Loader from "./Components/Loader/Loader";
import FilterContextProvider from "./context/FilterContext";
import SearchContextProvider from "./context/SearchContext";

const App = () => {
  return (
    <div>
      <SearchContextProvider>
        <FilterContextProvider>
          <Home />
        </FilterContextProvider>
      </SearchContextProvider>
    </div>
  );
};

export default App;
