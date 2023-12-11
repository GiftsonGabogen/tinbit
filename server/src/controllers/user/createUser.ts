import { Request, Response } from "express";
import "@utils/config";
import { createPerson } from "@utils/queries";
import Pool from "@utils/db";
import { checkIfEmailExist } from "@controllers/common/email";

interface PersonAccount {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePic: string;
}

const createPersonAccount = async (details: PersonAccount) => {
  const { firstName, lastName, email, password, profilePic } = details;
  try {
    const createAccountQueryResponse = await Pool.query(createPerson, [
      firstName,
      lastName,
      email,
      password,
      profilePic,
    ]);
    return createAccountQueryResponse.rows[0];
  } catch (error) {
    throw error;
  }
};

export default async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, profilePic } = req.body;
  const isEmailExist = await checkIfEmailExist(email);
  if (isEmailExist) {
    res
      .status(200)
      .json({ statusMessage: "Failed", message: "Email Already Exists" });
  }
  const createdPersonAccount = await createPersonAccount({
    firstName,
    lastName,
    email,
    password,
    profilePic,
  });
  console.log(createdPersonAccount);
  res.json({
    statusMessage: "Success",
    message: "User Created Successfully",
    data: createdPersonAccount,
  });
};
