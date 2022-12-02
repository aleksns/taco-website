import { useState } from "react";
import { NavLink } from "react-router-dom";
import ErrorComponent from "../componentsReusable/ErrorComponent";
import useSignup from "../hooks/useSignup";
import { ROUTES } from "../services/services";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  async function handleSubmit(e) {
    e.preventDefault();

    await signup(email, password);
  }

  return (
    <div className="login">
      <div className="login-img"></div>

      <div className="login-right-side">
        <h1>Taco Squad</h1>
        <p>Sign Up to join our Taco Club!</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form-btns">
            <NavLink
              to={ROUTES.SIGN_UP}
              className="login-form-btn login-form-btn-toggled"
            >
              Sign UP
            </NavLink>
            <NavLink to={ROUTES.LOG_IN} className="login-form-btn">
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
          <div className="login-form-checkbox">
            <input type="checkbox" id="terms" name="terms" required />
            <label htmlFor="terms">I agree with Taco Rules</label>
          </div>

          <button disabled={isLoading} className="login-form-submit-btn">
            Join Taco Club
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
