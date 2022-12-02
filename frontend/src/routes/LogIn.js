import { useState } from "react";
import { NavLink } from "react-router-dom";
import ErrorComponent from "../componentsReusable/ErrorComponent";
import useLogin from "../hooks/useLogin";
import { ROUTES } from "../services/services";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  async function handleSubmit(e) {
    e.preventDefault();

    await login(email, password);
  }

  return (
    <div className="login">
      <div className="login-img"></div>

      <div className="login-right-side">
        <h1>Taco Squad</h1>
        <p>Log In if you are a Taco!</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form-btns">
            <NavLink to={ROUTES.SIGN_UP} className="login-form-btn">
              Sign UP
            </NavLink>
            <NavLink
              to={ROUTES.LOG_IN}
              className="login-form-btn login-form-btn-toggled"
            >
              Log IN
            </NavLink>
          </div>

          <div className="login-form-input">
            <label htmlFor="loginEmail">Email:</label>
            <input
              type="email"
              id="loginEmail"
              name="loginEmail"
              minLength="5"
              maxLength="50"
              autoComplete="off"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="loginPassword">Password:</label>
            <input
              type="password"
              id="loginPassword"
              name="loginPassword"
              minLength="5"
              maxLength="50"
              autoComplete="off"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button disabled={isLoading} className="login-form-submit-btn">
            Log In
          </button>
          {error && <ErrorComponent error={error} />}
        </form>

        <NavLink to={ROUTES.HOME} className="login-right-side-back">
          Back to Tacos
        </NavLink>
      </div>
    </div>
  );
}
