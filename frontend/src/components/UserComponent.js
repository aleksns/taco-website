import { useState } from "react";
import { NavLink } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import userImg from "../images/user.png";
import { ROUTES } from "../services/services";

export default function UserComponent(props) {
  const { user, isLogged } = props;
  const { logout } = useLogout();
  const [isUserInfoOpened, setIsUserInfoOpened] = useState(false);
  const hamMenu = document.querySelector(".header-ham-menu");
  const nav = document.querySelector(".header-nav-section");

  function handleLogout() {
    logout();
    handleCloseUserInfo();
    window.location.reload();
  }

  function handleOpenUserInfo() {
    nav.classList.remove("header-nav-section-active");
    hamMenu.classList.remove("ham-toggle");
    setIsUserInfoOpened(true);
  }

  function handleCloseUserInfo() {
    if (user) {
      setIsUserInfoOpened(false);
    }
  }

  function User() {
    return (
      <>
        <div className="nav-login-container">
          <div
            className="nav-login no-user-select"
            onClick={handleOpenUserInfo}
          >
            <img src={userImg} className="nav-img" alt="sign-in" />
            {isLogged && <div className="nav-login-dot"></div>}
          </div>

          {isUserInfoOpened && (
            <div className="nav-login-info">
              <p>{user.email}</p>
              <button onClick={handleLogout}>Log Out</button>
            </div>
          )}
        </div>

        {isUserInfoOpened && (
          <div
            className="nav-login-info-overlay"
            onClick={handleCloseUserInfo}
          ></div>
        )}
      </>
    );
  }

  function Guest() {
    return (
      <div className="nav-login-container">
        <div className="nav-login no-user-select">
          <NavLink to={ROUTES.SIGN_UP}>
            <img src={userImg} className="nav-img" alt="sign-in" />
          </NavLink>
        </div>
      </div>
    );
  }

  return <>{isLogged ? <User /> : <Guest />}</>;
}
