import { useSelector } from "react-redux";
import FunctionsHandler from "./FunctionsHandler";

export default function SearchInput() {
  const menu = useSelector((state) => state.menu);
  const {
    openSearchResultWindow,
    closeSearchResultWindow,
    setSearchItemsFunction,
  } = FunctionsHandler();

  function handleSearch(e) {
    let input = e.target.value.toLowerCase();

    var result = [];

    menu.forEach(element => {
      element.items.forEach((dish) =>
        dish.name.toLowerCase().includes(input) && result.push(dish)
        )
    });

    if (input.length >= 1) {
      setSearchItemsFunction(result);
      openSearchResultWindow();
    }
    else if (input.length <= 0) {
      closeSearchResultWindow();
    }
  }

  return (
    <input
      type="search"
      placeholder="Search Dish Here..."
      name="q"
      maxLength="20"
      autoComplete="off"
      className="search-input"
      onChange={(e) => handleSearch(e)}
    ></input>
  );
}
