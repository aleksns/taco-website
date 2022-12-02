import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FunctionsHandler from "../components/FunctionsHandler";
import { ROUTES } from "../services/services";

export default function useLogin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const { loginFunction } = FunctionsHandler();

  async function login(email, password) {
    //setIsLoading(true);
    setError(null);

    if (!validated(email, password)) {
      setError("Incorrect email or password");
      return;
    } else {
      const user = JSON.stringify({email});

      localStorage.setItem("user", user);

      loginFunction(user);
      setIsLoading(false);

      navigate(ROUTES.HOME);
      window.location.reload();
    }

    function validated(email, password) {
      return (
        email == process.env.REACT_APP_TEST_EMAIL &&
        password == process.env.REACT_APP_TEST_PASSWORD
      );
    }
    // const response = await fetch("/api/user/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, password }),
    // });

    // const json = await response.json();

    // if (!response.ok) {
    //   setIsLoading(false);
    //   setError(json.error);
    // }
    // if (response.ok) {
    //   localStorage.setItem("user", JSON.stringify(json));

    //   loginFunction(json);
    //   setIsLoading(false);

    //   navigate(ROUTES.HOME);
    //   window.location.reload();
    // }
  }

  return { login, isLoading, error };
}
