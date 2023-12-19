import express from "express";
import { CreateWebsite } from "@controllers/website";
// import getUser from "../../controllers/user/getUser";
const Router = express.Router();

Router.post("/", CreateWebsite);

export default Router;
