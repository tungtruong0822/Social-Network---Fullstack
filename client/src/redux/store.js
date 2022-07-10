import { configureStore } from "@reduxjs/toolkit";
import auth from "./reducers/auth";
import post from "./reducers/post";
import socket from "./reducers/socket";
import conversation from "./reducers/conversation";
import alert from "./reducers/alert";

// Store
const store = configureStore({
  reducer: { auth, post, socket, conversation, alert },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Export
export default store;
