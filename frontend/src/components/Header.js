import { NavLink } from "react-router-dom";
import "../App.css";
import logoImg from "../images/logo.png";
import cartImg from "../images/cart.png";
import { NAME, ROUTES } from "../services/services";
import SearchInput from "./SearchInput";
import SearchResultWindow from "./SearchResultWindow";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import HamMenu from "../componentsReusable/HamMenu";
import UserComponent from "./UserComponent";

export default function Header() {
  const cart = useSelector((state) => state.cart);
  const authentication = useSelector((state) => state.authentication);

  useEffect(() => {
    const hamMenu = document.querySelector(".header-ham-menu");
    const nav = document.querySelector(".header-nav-section");
    const navLinks = document.querySelector(".header-nav-links");

    hamMenuSlide();

    function hamMenuSlide() {
      hamMenu.addEventListener(
        "click",
        () => {
          nav.classList.toggle("header-nav-section-active");
          hamMenu.classList.toggle("ham-toggle");
        },
        false
      );

      navLinks.addEventListener(
        "click",
        () => {
          nav.classList.remove("header-nav-section-active");
          hamMenu.classList.remove("ham-toggle");
        },
        false
      );
    }
  }, []);

  return (
    <div className="header section">
      <HamMenu />

      <NavLink to={ROUTES.HOME} className="header-logo-container">
        <img src={logoImg} alt="logo" />
        <h1>{NAME}</h1>
      </NavLink>

      <div className="header-nav-section">
        <div className="header-nav-links">
          <NavLink to={ROUTES.ORDERS}>Orders</NavLink>
          <NavLink to={ROUTES.ERROR}>Restaurants</NavLink>
        </div>

        <div className="search">
          <SearchInput />
          <SearchResultWindow />
        </div>
      </div>

      <div className="login-cart-container">
        <NavLink to={ROUTES.CART}>
          <div className="nav-cart">
            <img src={cartImg} className="nav-img" alt="cart" />
            {cart.totalAmount > 0 && (
              <p className="nav-cart-amount">{cart.totalAmount}</p>
            )}
          </div>
        </NavLink>

        <UserComponent
          user={authentication.user}
          isLogged={authentication.isLogged}
        />
      </div>
    </div>
  );
}
