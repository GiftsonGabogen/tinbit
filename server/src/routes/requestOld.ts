import express, { Request, Response, NextFunction } from "express";
const Router = express.Router();

// const dotenv = require("dotenv");
// dotenv.config(); // Load environment variables from .env file

const { OAuth2Client } = require("google-auth-library");

/* GET users listing. */
Router.post(
  "/",
  async function (req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Referrer-Policy", "no-referrer-when-downgrade");

    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_OAUTH_CLIENT_ID,
      process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      process.env.GOOGLE_OAUTH_REDIRECT_URL
    );

    // Generate the url that will be used for the consent dialog.
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
        "openid",
      ].join(" "),
      prompt: "consent",
    });

    res.json({ url: authorizeUrl });
  }
);

export default Router;
