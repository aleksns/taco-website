import { NavLink } from "react-router-dom";
import "../App.css";
import ImageComponent from "../componentsReusable/ImageComponent";
import FunctionsHandler from "./FunctionsHandler";

function MenuPreview(props) {
  const { item } = props;
  return (
    <NavLink to={item.url}>
      <div className="food-card-preview no-user-select">
        <ImageComponent original={item.imageUrl} alt={item.name} styles="menu-grid-img"/>
        <div className="food-card-preview-text">
          <h1>{item.name}</h1>
        </div>
      </div>
    </NavLink>
  );
}


function FoodPreview(props) {
  const { item } = props;
  const { openModalFood } = FunctionsHandler();
  return (
      <div className="food-card-preview no-user-select" onClick={() => openModalFood(item)}>
        <img src={item.imageUrl} className="menu-grid-img" alt={item.name}/>
        <div className="food-card-preview-text">
          <h2>{item.name}</h2>
          <h3>{item.price}$</h3>
          <h4 className="food-card-preview-order">Order</h4>
        </div>
      </div>
  );
}

export default function FoodCardPreview(props) {
  const { item, isCategory } = props;

  return <>{isCategory ? <MenuPreview item={item}/> : <FoodPreview item={item}/>}</>;
}
