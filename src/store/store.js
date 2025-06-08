import { configureStore } from "@reduxjs/toolkit";
import vanReducer from "./vanSlice";

export const store = configureStore({
  reducer: {
    vans: vanReducer,
  },
});
