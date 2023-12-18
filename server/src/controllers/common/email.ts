import { checkEmailIfExists, getUser } from "@utils/queries";
import Pool from "@utils/db";

export const checkIfEmailExist = async (email: string): Promise<boolean> => {
  try {
    const isEmailExistQueryResponse = await Pool.query(checkEmailIfExists, [
      email,
    ]);
    if (isEmailExistQueryResponse.rows.length) {
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

export const getUserByEmail = async (tokenEmail: string) => {
  const User = await Pool.query(getUser, [tokenEmail]);
  const {
    firstname: firstName,
    lastname: lastName,
    email,
    profile_pic_url: profilePicUrl,
  } = User.rows[0];
  return {
    firstName,
    lastName,
    email,
    profilePicUrl,
  };
};
