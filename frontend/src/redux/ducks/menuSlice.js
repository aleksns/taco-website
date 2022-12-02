import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "MENU",
  initialState: [],
  reducers: {
    getMenu() {},
    setMenu(state, action) {
      const menu = action.payload;
      return menu;
    },
  },
});

export const { getMenu, setMenu } = menuSlice.actions;

export default menuSlice.reducer;
