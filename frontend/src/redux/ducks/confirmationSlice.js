import { createSlice } from "@reduxjs/toolkit";

const confirmationSlice = createSlice({
  name: "CONFIRMATION",
  initialState: {
    item: {},
    isOpen: false,
    isRemoveAll: false,
  },
  reducers: {
    setConfirmationItem(state, action) {
      const newItem = action.payload;
      state.item = newItem;
    },
    removeConfirmationItem(state, action) {
      state.item = {};
    },
    openConfirmation(state, action) {
      const isRemoveAll = action.payload;
      state.isOpen = true;
      state.isRemoveAll = isRemoveAll;
    },
    closeConfirmation(state, action) {
      state.isOpen = false;
    },
  },
});

const { actions, reducer } = confirmationSlice;
export const {
  setConfirmationItem,
  removeConfirmationItem,
  openConfirmation,
  closeConfirmation,
} = actions;

export default reducer;
