import { createSlice } from "@reduxjs/toolkit";

const additionsSlice = createSlice({
  name: "ADDITIONS",
  initialState: [],
  reducers: {
    getAdditions() {},
    setAdditions(state, action) {
      const additionsData = action.payload;
      return additionsData;
    },
  },
});

export const { getAdditions, setAdditions } = additionsSlice.actions;

export default additionsSlice.reducer;
