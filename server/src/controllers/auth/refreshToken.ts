import { Request, Response } from "express";
import { UserRefreshClient } from "google-auth-library";
import "@utils/config";

export default async (req: Request, res: Response) => {
  // const user = new UserRefreshClient(
  //   process.env.GOOGLE_OAUTH_CLIENT_ID,
  //   process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  //   req.body.refreshToken
  // );
  // const { credentials } = await user.refreshAccessToken(); // optain new tokens
  // res.json(credentials);

  const body = new URLSearchParams({
    client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
    client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    grant_type: "refresh_token",
    refresh_token: req.body.refreshToken,
    redirect_uri: "postmessage",
  });

  const data = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    body,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  const resData = await data.json();
  res.json(resData);
};
