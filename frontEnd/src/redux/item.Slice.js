// redux/itemsSlice.js
import { createSlice } from "@reduxjs/toolkit";

// ✅ Initial state
const initialState = {
  list: [], // stores all fetched items
};

// ✅ Slice
const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    // Replace the entire items list
    setItems: (state, action) => {
      state.list = action.payload;
    },
  },
});

// ✅ Exports
export const { setItems } = itemsSlice.actions;
export default itemsSlice.reducer;
