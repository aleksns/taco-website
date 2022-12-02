import { NavLink, useLocation } from "react-router-dom";
import ImageComponent from "../componentsReusable/ImageComponent";
import { ROUTES } from "../services/services";

export default function MenuNav(props) {
  const { menu } = props;

  let location = useLocation();
  return (
    <div className="centered-section menu-nav no-user-select">
      <NavLink to={ROUTES.HOME} className="menu-nav-home">
        <u>Menu</u>
      </NavLink>
      {menu.map((category) => (
        <ul
          key={category.id}
          className={`menu-nav-item ${
            location.pathname == category.url ? "menu-nav-item-toggled" : ""
          }`}
        >
          <NavLink to={category.url}>
            <ImageComponent
              original={category.imageUrl}
              alt={category.name}
              styles=""
            />
            <p>{category.name}</p>
          </NavLink>
        </ul>
      ))}
    </div>
  );
}
