import { configureStore } from "@reduxjs/toolkit";
import vanReducer from "./vanSliceSlice";

export const store = configureStore({
  reducer: { campers: vanReducer },
});
