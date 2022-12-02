import { NOTIFICATION } from "../services/services";
import FunctionsHandler from "./FunctionsHandler";


export default function NotificationHandler() {
  const {
    setNotificationTypeFunction,
    setNotificationTextFunction,
    setNotificationImageFunction,
    openNotificationFunction,
    closeNotificationFunction,
  } = FunctionsHandler();

  var notificationTimer;

  function setNotificationError(errors) {
    restartTimer();

    setNotificationTypeFunction(NOTIFICATION.ERROR_TYPE);
    setNotificationImageFunction(NOTIFICATION.ERROR_IMG);

    for (let property in errors) {
      setNotificationTextFunction(errors[property]);
    }

    openNotificationFunction();
  }

  function setNotificationSuccess() {
    restartTimer();

    setNotificationTypeFunction(NOTIFICATION.SUCCESS_TYPE);
    setNotificationImageFunction(NOTIFICATION.SUCCESS_IMG);
    setNotificationTextFunction(`Your order has been created!`);

    openNotificationFunction();
  }

  function setNotificationWarning() {
    restartTimer();

    setNotificationTypeFunction(NOTIFICATION.WARNING_TYPE);
    setNotificationImageFunction(NOTIFICATION.WARNING_IMG);
    setNotificationTextFunction(`You must be logged in!`);

    openNotificationFunction();
  }

  function restartTimer() {
    clearTimeout(notificationTimer);
    notificationTimer = setTimeout(() => {
      closeNotificationFunction();
    }, 2000);

    closeNotificationFunction();
  }
  return {
    setNotificationError,
    setNotificationSuccess,
    setNotificationWarning,
  };
}
