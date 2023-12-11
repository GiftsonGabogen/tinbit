import { Request, Response } from "express";
import NewOAuthClient from "@utils/newOAuthClient";
import "@utils/config";
import { checkIfEmailExist } from "@controllers/common/email";
import { getUser } from "@utils/queries";
import Pool from "@utils/db";

const oAuth2Client = NewOAuthClient();

export default async (req: Request, res: Response) => {
  console.log(req.body.code);
  const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
  const tokenInfo = await oAuth2Client.getTokenInfo(tokens.access_token);

  const doesEmailExist = await checkIfEmailExist(tokenInfo?.email);

  if (doesEmailExist) {
    const User = await Pool.query(getUser, [tokenInfo?.email]);
    const {
      firstname: firstName,
      lastname: lastName,
      email,
      profile_pic_url: profilePicUrl,
    } = User.rows[0];
    const { access_token, refresh_token } = tokens;
    res
      .status(200)
      .json({
        firstName,
        lastName,
        email,
        profilePicUrl,
        access_token,
        refresh_token,
      });
  } else {
    res.status(403);
  }
};
