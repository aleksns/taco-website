import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "ORDERS",
  initialState: [],
  reducers: {
    getOrders() {},
    setOrders(state, action) {
      const orders = action.payload;
      return orders;
    },
  },
});

export const { getOrders, setOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
