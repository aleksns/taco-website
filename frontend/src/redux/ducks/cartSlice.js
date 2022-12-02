import { createSlice } from "@reduxjs/toolkit";
import {
  calculateTotalPrice,
  roundDecimalHundreds,
} from "../../services/services";

const cartSlice = createSlice({
  name: "CART",
  initialState: {
    items: [],
    totalAmount: 0,
    totalPrice: 0,
  },
  reducers: {
    emptyCart(state, action) {
      state.items = [];
    },
    addToCart(state, action) {
      const item = action.payload;
      state.items.push(item);
    },
    removeFromCart(state, action) {
      const itemToRemove = action.payload;
      state.items = state.items.filter(
        (element) => element.cartId !== itemToRemove.cartId
      );
    },
    updateCartItem(state, action) {
      const { index, amount, additionsToAdd, totalPrice } = action.payload;
      state.items[index].amountOrdered = amount;
      state.items[index].additions = additionsToAdd;
      state.items[index].totalPrice = totalPrice;
    },
    setCartTotal(state, action) {
      const { cartTotalAmount, cartTotalPrice } = action.payload;
      state.totalAmount = cartTotalAmount;
      state.totalPrice = cartTotalPrice;
    },
    updateCartTotal(state, action) {
      const { amountDifference, priceDifference } = action.payload;
      state.totalAmount += amountDifference;
      state.totalPrice = roundDecimalHundreds(
        state.totalPrice + priceDifference
      );
    },
    setCartItems(state, action) {
      const items = action.payload;
      state.items = items;
    },
    incrementCartItem(state, action) {
      const index = action.payload;
      state.items[index].amountOrdered++;
    },
    decrementCartItem(state, action) {
      const index = action.payload;
      state.items[index].amountOrdered--;
    },
    calcCartItemPrice(state, action) {
      const index = action.payload;
      let newPrice = calculateTotalPrice(
        state.items[index].price,
        state.items[index].amountOrdered,
        state.items[index].additions
      );
      state.items[index].totalPrice = newPrice;
    },
  },
});

const { actions, reducer } = cartSlice;
export const {
  addToCart,
  removeFromCart,
  updateCartItem,
  setCartTotal,
  emptyCart,
  updateCartTotal,
  setCartItems,
  incrementCartItem,
  decrementCartItem,
  calcCartItemPrice,
} = actions;

export default reducer;
