import { createSlice } from "@reduxjs/toolkit";

type InitialT = {
  roomID: string | null;
};

const initialState: InitialT = {
  roomID: null,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRoomId: (state, action) => {
      state.roomID = action.payload;
    },
  },
});

export const { setRoomId } = UserSlice.actions;
export default UserSlice.reducer;
