import { useSelector } from "react-redux";
import FunctionsHandler from "../components/FunctionsHandler";

export default function Notification() {
  const notification = useSelector((state) => state.notification);
  const { closeNotificationFunction } = FunctionsHandler();

  return (
    <>
      {notification.isOpen && (
        <div
          id="notification"
          className={`notification ${notification.type}`}
          onClick={() => closeNotificationFunction()}
        >
          <img
            src={notification.image}
            alt="error"
            className="notification-img"
          ></img>
          <div className="notification-text-container">
          {notification.text.map((text, index) => (
            <p key={index} className="notification-text">{`${text == ""? "" : "- "}${text}`}</p>
          ))}
          </div>
        </div>
      )}
    </>
  );
}
