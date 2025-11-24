// redux/salesSlice.js
import { createSlice } from "@reduxjs/toolkit";

// ✅ Initial state
const initialState = {
  list: [], // stores all fetched sales
};

// ✅ Slice
const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    // Replace the entire sales list
    setSales: (state, action) => {
      state.list = action.payload;
    },
  },
});

// ✅ Exports
export const { setSales } = salesSlice.actions;
export default salesSlice.reducer;
