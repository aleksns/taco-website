import { createSlice } from "@reduxjs/toolkit";

const authenticationSlice = createSlice({
  name: "AUTHENTICATION",
  initialState: {
    user: {},
    isLogged: false,
  },
  reducers: {
    login(state, action) {
      const user = action.payload;
      state.user = user;
      state.isLogged = true;
    },
    logout(state, action) {
      state.user = {};
      state.isLogged = false;
    },
  },
});

const { actions, reducer } = authenticationSlice;
export const { login, logout } = actions;
export const getUser = (state) => state.authentication.user;
export default reducer;
