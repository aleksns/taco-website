import { useSelector } from "react-redux";
import SearchFoodCard from "./SearchFoodCard";

export default function SearchResultWindow() {
  const search = useSelector((state) => state.search);

  function SearchResultComponent() {
    return (
      <div className="search-result">
        {search.items.map((item) => (
          <SearchFoodCard key={item.id} item={item} />
        ))}
      </div>
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
