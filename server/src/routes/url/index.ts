import express from "express";
import {
  CreateWebsite,
  CreateShortUrl,
  CreateUrl,
  CreateWebsiteUrl,
  GetShortUrlWithUrlsAndWebsites,
  GetWebsite,
} from "@controllers/url";
// import getUser from "../../controllers/user/getUser";
const Router = express.Router();

Router.get("/short_url", GetShortUrlWithUrlsAndWebsites);
Router.get("/website", GetWebsite);

Router.post("/website", CreateWebsite);
Router.post("/short_url", CreateShortUrl);
Router.post("/url", CreateUrl);
Router.post("/website_url", CreateWebsiteUrl);

export default Router;
