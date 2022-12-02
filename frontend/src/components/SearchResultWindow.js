import { useEffect } from "react";
import { useSelector } from "react-redux";
import FunctionsHandler from "./FunctionsHandler";
import SearchFoodCard from "./SearchFoodCard";

export default function SearchResultWindow(props) {
  const { handleCloseSearch } = props;
  const search = useSelector((state) => state.search);
  const {
    closeSearchResultWindow,
  } = FunctionsHandler();

  function SearchResultComponent() {

    // function handleCloseSearch() {
    //   let searchInput = document.querySelector("#search-input");
    //   searchInput.value = "";

    //   closeSearchResultWindow();
    // }

    return (
      <>
      <div className="search-result">
        {search.items.map((item) => (
          <SearchFoodCard key={item.id} item={item} />
        ))}
      </div>

      <div className="search-result-overlay" onClick={handleCloseSearch}></div>
      </>
    );
  }
  return (
    <>
      {search.isOpen && search.items && search.items.length != 0 && (
        <SearchResultComponent />
      )}
    </>
  );
}
