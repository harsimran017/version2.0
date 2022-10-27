import { authApi } from "../services/authApi";
import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "../slices/authSlice";
import { appApi } from "../services/appApi";

export default combineReducers({
  [authSlice.name]: authSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [appApi.reducerPath]: appApi.reducer,
});
