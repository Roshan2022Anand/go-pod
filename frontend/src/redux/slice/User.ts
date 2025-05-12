import { createSlice } from "@reduxjs/toolkit";

type UserState = {
  name: string | null;
  email: string | null;
  roomId: string | null;
};

const initialState: UserState = {
  name: "roshan",
  email: "r@gmail.com",
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
