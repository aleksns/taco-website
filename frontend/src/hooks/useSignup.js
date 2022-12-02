import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import FunctionsHandler from "../components/FunctionsHandler";
// import { ROUTES } from "../services/services";

export default function useSignup() {
  //const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  //const { loginFunction } = FunctionsHandler();

  async function signup(email, password) {
     setIsLoading(false);
     setError("Currently we don't accept new Tacos :/");

    // const response = await fetch("/api/user/signup", {
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

  return { signup, isLoading, error };
}
