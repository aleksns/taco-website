import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "SEARCH",
  initialState: {
    items: [],
    isOpen: false,
  },
  reducers: {
    setSearchItems(state, action) {
      const newItems = action.payload;
      state.items = newItems;
    },
    openSearch(state, action) {
      state.isOpen = true;
    },
    closeSearch(state, action) {
      state.isOpen = false;
    },
  },
});

const { actions, reducer } = searchSlice;
export const { setSearchItems, openSearch, closeSearch } = actions;

export default reducer;
