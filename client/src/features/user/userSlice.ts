import { createSlice } from "@reduxjs/toolkit";
// import userReducers from "./userReducers";
import type { PayloadAction } from "@reduxjs/toolkit";

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
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      const { firstName, lastName, email, profilePic } = action.payload;

      state.email = email;
      state.firstName = firstName;
      state.lastName = lastName;
      state.profilePic = profilePic;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
