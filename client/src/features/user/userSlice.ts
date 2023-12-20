import { createSlice } from "@reduxjs/toolkit";
import userReducers from "./userReducers";

export type UserState = {
  firstName: string;
  lastName: string;
  profilePic: string;
  email: string;
};

const initialState: UserState = {
  firstName: "",
  lastName: "",
  profilePic: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: userReducers,
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
