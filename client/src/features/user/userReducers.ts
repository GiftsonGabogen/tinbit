import type { PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./userSlice";

export default {
  setUser: (userState: UserState, action: PayloadAction<UserState>) => {
    const { firstName, lastName, email, profilePic } = action.payload;

    userState.email = email;
    userState.firstName = firstName;
    userState.lastName = lastName;
    userState.profilePic = profilePic;
  },
};
