import { Request, Response } from "express";
import { UserRefreshClient } from "google-auth-library";
import "@utils/config";

export default async (req: Request, res: Response) => {
  const user = new UserRefreshClient(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    req.body.refreshToken
  );
  const { credentials } = await user.refreshAccessToken(); // optain new tokens
  console.log(credentials);
  res.json(credentials);
};
