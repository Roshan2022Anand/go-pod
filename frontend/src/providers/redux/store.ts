import { configureStore } from "@reduxjs/toolkit";
import user from "./slice/user";
import room from "./slice/room";

export const store = configureStore({
  reducer: {
    user,
    room,
  },
});

export type StateT = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
