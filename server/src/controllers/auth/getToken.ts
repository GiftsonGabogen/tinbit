import { Request, Response } from "express";
import NewOAuthClient from "@utils/newOAuthClient";
import "@utils/config";

const oAuth2Client = NewOAuthClient();

export default async (req: Request, res: Response) => {
  const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
  const tokenInfo = await oAuth2Client.getTokenInfo(tokens.access_token);
  const getNameUrl =
    await "https://people.googleapis.com/v1/people/me?personFields=names";
  const getPhotoUrl =
    await "https://people.googleapis.com/v1/people/me?personFields=photos";

  const namesResponse = await fetch(getNameUrl, {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });
  const photosResponse = await fetch(getPhotoUrl, {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });
  const { photos } = await photosResponse.json();
  const { names } = await namesResponse.json();
  const { access_token, refresh_token } = tokens;
  res.json({
    access_token,
    refresh_token,
    firstName: names[0]?.givenName,
    lastName: names[0]?.familyName,
    profilePicUrl: photos[0]?.url,
    email: tokenInfo.email,
  });
};
