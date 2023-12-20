import { Request, Response } from "express";
import "@utils/config";
import { getAllWebsite } from "@utils/queries";
import Pool from "@utils/db";

const getAllWebsiteFunction = async () => {
  try {
    const getShortUrlQueryResponse = await Pool.query(getAllWebsite);
    return getShortUrlQueryResponse;
  } catch (error) {
    throw error;
  }
};

export default async (req: Request, res: Response) => {
  const websites = await getAllWebsiteFunction();

  res.json({
    statusMessage: "Success",
    message: "Get Websites Successfully",
    data: websites?.rows,
  });
};
