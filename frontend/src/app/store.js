import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import tweetReducer from "../features/tweets/tweetSlice"; 
export const store = configureStore({
  reducer: {
    auth: authReducer,
    tweet: tweetReducer,
  },
});