import express from "express";
import { GetToken, Login, RefreshToken } from "@controllers/auth";
const Router = express.Router();

Router.post("/", GetToken);
Router.get("/refresh-token", RefreshToken);
Router.post("/login", Login);

export default Router;
