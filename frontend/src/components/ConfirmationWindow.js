import "../App.css";
import { useSelector } from "react-redux";
import FunctionsHandler from "./FunctionsHandler";
import { ButtonClose } from "../componentsReusable/ButtonsComponent";

export default function ConfirmationWindow() {
  const {
    closeConfirmationFunction,
    removeFromCartFunction,
    emptyCartFunction,
  } = FunctionsHandler();
  const confirmation = useSelector((state) => state.confirmation);

  function handleClose() {
    closeConfirmationFunction();
  }

  function handleSubmit() {
    removeFromCartFunction(confirmation.item);
    closeConfirmationFunction();
  }

  function handleSubmitAll() {
    emptyCartFunction();
    closeConfirmationFunction();
  }

  return (
    <>
      {confirmation.isOpen && (
        <>
          <div className="confirmation-window centered-section">
            <ButtonClose onClick={handleClose} size="btn-big" />
            {confirmation.isRemoveAll ? (
              <h1>Remove all Items?</h1>
            ) : (
              <h1>Remove this Dish?</h1>
            )}

            <div className="confirmation-window-control">
              <button
                className="confirmation-window-control-cancel"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="confirmation-window-control-submit"
                onClick={
                  confirmation.isRemoveAll ? handleSubmitAll : handleSubmit
                }
              >
                Remove
              </button>
            </div>
          </div>
          <div className="overlay" onClick={handleClose}></div>
        </>
      )}
    </>
  );
}
