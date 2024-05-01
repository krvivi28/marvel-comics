import Home from "./Components/Home/Home";
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
