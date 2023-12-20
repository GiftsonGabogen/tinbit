import { RootState } from "../../store";

export const getWebsite = (state: RootState) => {
  return state.website;
};

export const getWebsites = (state: RootState) => {
  return state.website.websites;
};
