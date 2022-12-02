import { NavLink } from "react-router-dom";
import { ROUTES } from "../services/services";

export default function PageNotFound() {
  return (
    <div className="page-404">
      <h1>404</h1>
      <h2>This page doesn't exist :(</h2>
      <NavLink to={ROUTES.HOME}>Go Back to Eat Tacos</NavLink>
    </div>
  );
}
