import { checkEmailIfExists } from "@utils/queries";
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
