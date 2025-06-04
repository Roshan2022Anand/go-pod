import { configureStore } from "@reduxjs/toolkit";
import user from "./slice/user";
// import testUser from "./slice/user.test";
import room from "./slice/room";

export const store = configureStore({
  reducer: {
    user,
    room,
    // user: testUser,
  },
});

export type StateT = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
