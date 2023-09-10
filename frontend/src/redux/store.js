import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarReducer";
import authReducer from "./authReducer";

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    auth: authReducer,
  },
});

export default store;
