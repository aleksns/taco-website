import "../App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Orders from "./Orders";
import CategoryItems from "./CategoryItems";
import LoadingPlaceholder from "../componentsReusable/LoadingPlaceholder";
import { ROUTES } from "../services/services";
import Cart from "./Cart";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import PageNotFound from "./PageNotFound";
import NewCreatedOrder from "./NewCreatedOrder";
import { useSelector } from "react-redux";

export default function RoutesComponent(props) {
  const { menu } = props;
  const isLogged = useSelector((state) => state.authentication.isLogged);

  function RoutesContent() {
    return (
      <Routes>
        <Route exact path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ORDERS} element={<Orders />} />
        <Route
          path={ROUTES.SIGN_UP}
          element={!isLogged ? <SignUp /> : <Navigate to={ROUTES.HOME} />}
        />
        <Route
          path={ROUTES.LOG_IN}
          element={!isLogged ? <LogIn /> : <Navigate to={ROUTES.HOME} />}
        />
        <Route path={ROUTES.CART} element={<Cart />} />
        <Route path={ROUTES.CREATED_ORDER} element={<NewCreatedOrder />} />
        <Route path={ROUTES.ERROR} element={<PageNotFound />} />
        <Route path="*" element={<Navigate to={ROUTES.ERROR} replace />} />
        {menu.map((category) => (
          <Route
            path={`/${category.name.toLowerCase()}`}
            element={<CategoryItems menu={menu} items={category.items} />}
            key={category.id}
          />
        ))}
      </Routes>
    );
  }

  return <>{menu ? <RoutesContent /> : <LoadingPlaceholder />}</>;
}
