import express from "express";
import { CreateUser } from "@controllers/user";
// import getUser from "../../controllers/user/getUser";
const Router = express.Router();

Router.post("/register", CreateUser);

export default Router;
