import NewOAuthClient from "@utils/newOAuthClient";
import { Request, Response } from "express";
import "@utils/config";
import { UserRefreshClient } from "google-auth-library";
import { checkIfEmailExist, getUserByEmail } from "@controllers/common/email";

export default async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const refreshToken = authHeader && authHeader.split(" ")[1];

  if (refreshToken) {
    try {
      const oAuth2Client = NewOAuthClient();
      const user = new UserRefreshClient(
        process.env.GOOGLE_OAUTH_CLIENT_ID,
        process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        refreshToken
      );
      const { credentials } = await user.refreshAccessToken(); // optain new tokens
      const { access_token, refresh_token } = credentials;
      const tokenInfo = await oAuth2Client.getTokenInfo(access_token);

      const doesEmailExist = await checkIfEmailExist(tokenInfo?.email);

      if (doesEmailExist) {
        const User = await getUserByEmail(tokenInfo?.email);
        return res.json({ ...User, access_token, refresh_token });
      } else {
        return res.status(403).json({ message: "not authenticated" });
      }
    } catch (error) {
      return res.status(403).json({ message: "not authenticated" });
    }
  } else {
    return res.status(403).json({ message: "not authenticated" });
  }
};
