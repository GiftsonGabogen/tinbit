import { Request, Response } from "express";
import NewOAuthClient from "@utils/newOAuthClient";
import "@utils/config";
import { checkIfEmailExist, getUserByEmail } from "@controllers/common/email";
import { getUser } from "@utils/queries";
import Pool from "@utils/db";

const oAuth2Client = NewOAuthClient();

export default async (req: Request, res: Response) => {
  const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
  const tokenInfo = await oAuth2Client.getTokenInfo(tokens.access_token);

  const doesEmailExist = await checkIfEmailExist(tokenInfo?.email);

  const { access_token, refresh_token } = tokens;

  if (doesEmailExist) {
    const User = await getUserByEmail(tokenInfo?.email);
    res.status(200).json({ ...User, access_token, refresh_token });
  } else {
    res
      .status(403)
      .json({ statusMessage: "Failed", message: "email does not exist" });
  }
};
