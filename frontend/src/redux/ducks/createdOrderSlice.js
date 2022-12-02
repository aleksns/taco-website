import { createSlice } from "@reduxjs/toolkit";

const createdOrderSlice = createSlice({
  name: "CREATED_ORDER",
  initialState: {
    item: {},
  },
  reducers: {
    setCreatedOrder(state, action) {
      const newOrder = action.payload;
      state.item = newOrder;
    },
    removeCreatedOrder(state, action) {
      state.item = {};
    },
  },
});

export const { setCreatedOrder, removeCreatedOrder } =
  createdOrderSlice.actions;

export default createdOrderSlice.reducer;
