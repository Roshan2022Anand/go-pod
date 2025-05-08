import { createSlice } from "@reduxjs/toolkit";

type UserState = {
  name: string;
  email: string;
};

const initialState: UserState = {
  name: "roshan",
  email: "r@gmail.com",
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

// export const {} = UserSlice.actions;
export default UserSlice.reducer;
