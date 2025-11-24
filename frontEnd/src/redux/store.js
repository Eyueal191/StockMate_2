// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./item.Slice.js"; // make sure the file name matches

// ✅ Create store
const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
});

// ✅ Export default
export default store;
