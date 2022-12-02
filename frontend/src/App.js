import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Header from "./components/Header";
import { getMenu } from "./redux/ducks/menuSlice";
import Footer from "./components/Footer";
import RoutesComponent from "./routes/RoutesComponent";
import FoodCardModal from "./components/FoodCardModal";
import { getAdditions } from "./redux/ducks/additionsSlice";
import LocalStorageWatcher from "./components/LocalStorageWatcher";
import ConfirmationWindow from "./components/ConfirmationWindow";
import Notification from "./componentsReusable/Notification";
import { login } from "./redux/ducks/authenticationSlice";

export default function App() {
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menu);

  useEffect(() => {
    const userLocalStorage = JSON.parse(localStorage.getItem("user"));

    if (userLocalStorage) {
      dispatch(login(userLocalStorage));
    }

    dispatch(getMenu());
    dispatch(getAdditions());
  }, [dispatch]);

  return (
    <div className="main-container">
      <div className="background"></div>

      <div className="main-content">
        <RoutesComponent menu={menu} />
        <FoodCardModal />
        <Notification />
        <ConfirmationWindow />
        <LocalStorageWatcher />
      </div>

    </div>
  );
}
