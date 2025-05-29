import { createSlice } from "@reduxjs/toolkit";
import { generateID } from "../../../utils/genrator";

type UserState = {
  name: string;
  email: string;
  pic: string | null;
};

const initialState: UserState = {
  name: "user_" + generateID(2),
  email: generateID(3) + "@gmail.com",
  pic: "aa",
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default UserSlice.reducer;
