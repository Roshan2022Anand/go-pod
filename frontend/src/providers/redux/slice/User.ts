import { createSlice } from "@reduxjs/toolkit";

type UserState = {
  name: string | null;
  email: string | null;
  pic: string | null;
  roomId: string | null;
};

// test
const randomNames = [
  "roshan",
  "sachin",
  "saurabh",
  "prashant",
  "abhishek",
  "ankit",
  "siddharth",
  "shubham",
  "rahul",
  "rohit",
];
const randomEmails = [
  "ab@gamil.com",
  "cd@gamil.com",
  "ef@gamil.com",
  "gh@gamil.com",
  "ij@gamil.com",
  "kl@gamil.com",
  "mn@gamil.com",
  "op@gamil.com",
  "qr@gamil.com",
  "st@gamil.com",
];

const initialState: UserState = {
  // test
  name: randomNames[Math.floor(Math.random() * 10)],
  email: randomEmails[Math.floor(Math.random() * 10)],
  pic: "aa",
  roomId: null,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },
  },
});

export const { setRoomId } = UserSlice.actions;
export default UserSlice.reducer;
