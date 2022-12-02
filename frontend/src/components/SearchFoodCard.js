import "../App.css";
import FunctionsHandler from "./FunctionsHandler";

export default function SearchFoodCard(props) {
  const { item } = props;
  const { openModalFood } = FunctionsHandler();

  return (
    <div
      className="search-food-card-container no-user-select"
      onClick={() => openModalFood(item)}
    >
      <img
        className="search-food-card-img"
        src={item.imageUrl}
        alt={item.name}
      />

      <div className="search-food-card-content">
        <h2>{item.name}</h2>
        <h2 className="food-card-preview-order">{item.price}$</h2>
      </div>
    </div>
  );
}
