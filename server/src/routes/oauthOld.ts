import express, { Request, Response, NextFunction } from "express";
const Router = express.Router();
// const dotenv = require('dotenv');
// dotenv.config(); // Load environment variables from .env file

const { OAuth2Client } = require("google-auth-library");

async function getUserData(access_token) {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );

  //console.log('response',response);
  const data = await response.json();
  console.log("data", data);
}

/* GET home page. */
Router.get(
  "/sessions/oauth/google",
  async function (req: Request, res: Response, next: NextFunction) {
    const code = req.query.code;

    console.log(code);
    try {
      const oAuth2Client = new OAuth2Client(
        process.env.GOOGLE_OAUTH_CLIENT_ID,
        process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        process.env.GOOGLE_OAUTH_REDIRECT_URL
      );
      const res = await oAuth2Client.getToken(code);
      // Make sure to set the credentials on the OAuth2 client.
      await oAuth2Client.setCredentials(res.tokens);
      console.info("Tokens acquired.");
      const user = oAuth2Client.credentials;
      console.log("credentials", user);
      console.log("--------");
      await getUserData(oAuth2Client.credentials.access_token);
    } catch (err) {
      console.log("Error logging in with OAuth2 user", err);
    }

    res.redirect(303, "http://localhost:5173/");
  }
);

export default Router;
