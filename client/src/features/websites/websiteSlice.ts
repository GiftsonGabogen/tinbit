import { createSlice } from "@reduxjs/toolkit";
import websiteReducers from "./websiteReducers";

export interface Website {
  website_id: string;
  website_image: string;
  website_link: string;
  website_name: string;
}

export type WebsiteState = {
  websites: Website[];
};

const initialState: WebsiteState = { websites: [] };

export const websiteSlice = createSlice({
  name: "website",
  initialState,
  reducers: websiteReducers,
});

export const { setWebsites } = websiteSlice.actions;

export default websiteSlice.reducer;
