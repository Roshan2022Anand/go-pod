import { createSlice } from "@reduxjs/toolkit";

type UserState = {
  name: string | null;
  email: string | null;
  pic: string | null;
};

const initialState: UserState = {
  name:null,
  email: null,
  pic: null,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDetails: (state, action) => {
      const { name, email } = action.payload;
      state.name = name;
      state.email = email;
    },
  },
});

export const { setDetails } = UserSlice.actions;

export default UserSlice.reducer;
