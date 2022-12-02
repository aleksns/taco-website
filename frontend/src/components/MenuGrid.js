import { useSelector } from "react-redux";
import "../App.css";
import FoodCardPreview from "./FoodCardPreview";
import LoadingPlaceholder from "../componentsReusable/LoadingPlaceholder";

export default function MenuGrid() {
  const menu = useSelector((state) => state.menu);

  function MenuContent() {
    return (
        <div className="content-grid">
          {menu.map((category) => (
            <FoodCardPreview
              key={category.id}
              item={category}
              isCategory={true}
            />
          ))}
        </div>
    );
  }

  return <>{menu ? <MenuContent /> : <LoadingPlaceholder />}</>;
}
