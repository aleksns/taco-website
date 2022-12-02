import { createSlice } from "@reduxjs/toolkit";
import errorImg from "../../images/error-img.png";

const notificationSlice = createSlice({
  name: "NOTIFICATION",
  initialState: {
    type: "notification-error",
    text: ["Incorrect phone number", "The address is too short"],
    image: errorImg,
    isOpen: false,
  },
  reducers: {
    setNotificationType(state, action) {
      const newType = action.payload;
      state.type = newType;
    },
    addNotificationText(state, action) {
      const newText = action.payload;
      state.text.push(newText);
    },
    setNotificationImage(state, action) {
      const newImage = action.payload;
      state.image = newImage;
    },
    openNotification(state, action) {
      state.isOpen = true;
    },
    closeNotification(state, action) {
      state.isOpen = false;
      state.type = "";
      state.text = [];
    },
  },
});

const { actions, reducer } = notificationSlice;
export const {
  setNotificationType,
  addNotificationText,
  setNotificationImage,
  openNotification,
  closeNotification,
} = actions;

export default reducer;
