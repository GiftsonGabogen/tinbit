import {
  createPerson,
  getUser,
  checkEmailIfExists,
  getAllShortURLWithURLSByPersonId,
} from "./user.query";
import { getAllWebsite, createWebsite, deleteWebsite } from "./website.query";
import { createShortUrl } from "./short_url.query";
import { createUrl } from "./url.query";
import { createWebsiteUrl } from "./website_url.query";

export {
  createPerson,
  getUser,
  checkEmailIfExists,
  getAllWebsite,
  createWebsite,
  deleteWebsite,
  getAllShortURLWithURLSByPersonId,
  createShortUrl,
  createUrl,
  createWebsiteUrl,
};
