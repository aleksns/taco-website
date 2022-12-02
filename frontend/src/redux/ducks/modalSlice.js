import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "MODAL",
  initialState: {
    item: {},
    isOpen: false,
    isEdit: false,
  },
  reducers: {
    setModalItem(state, action) {
      const newItem = action.payload;
      state.item = newItem;
    },
    openModal(state, action) {
      state.isOpen = true;
    },
    closeModal(state, action) {
      state.isOpen = false;
    },
    setEditModal(state, action) {
      state.isEdit = action.payload;
    },
  },
});

const { actions, reducer } = modalSlice;
export const { setModalItem, openModal, closeModal, setEditModal } = actions;

export default reducer;
