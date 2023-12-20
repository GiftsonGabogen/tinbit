import type { PayloadAction } from "@reduxjs/toolkit";
import { WebsiteState } from "./websiteSlice";

export default {
  setWebsites: (
    websiteState: WebsiteState,
    action: PayloadAction<WebsiteState>
  ) => {
    const { websites } = action.payload;
    console.log(websites);

    websiteState.websites = websites;
  },
};
