import FunctionsHandler from "../components/FunctionsHandler";

export default function () {
  const { logoutFunction } = FunctionsHandler();

  function logout() {
    logoutFunction();
  }

  return { logout };
}
