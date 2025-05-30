import { createSlice } from "@reduxjs/toolkit";

type InitialT = {
  roomID: string | null;
  studioID: string | null;
  role: "host" | "guest" | null;
};

const initialState: InitialT = {
  roomID: null,
  studioID: null,
  role: null,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRoomId: (state, action) => {
      state.roomID = action.payload;
    },
    setStudioId: (state, action) => {
      state.studioID = action.payload;
    },
    setPodRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setRoomId, setStudioId, setPodRole } = UserSlice.actions;
export default UserSlice.reducer;
