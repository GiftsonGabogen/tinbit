import type { PayloadAction } from "@reduxjs/toolkit";
import { WebsiteState } from "./websiteSlice";

export default {
  setUser: (
    websiteState: WebsiteState,
    action: PayloadAction<WebsiteState>
  ) => {
    const { websites } = action.payload;

    websiteState.websites = websites;
  },
};
