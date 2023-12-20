import { Request, Response } from "express";
import "@utils/config";
import { createUrl } from "@utils/queries";
import Pool from "@utils/db";

interface Url {
  link: string;
  url_name: string;
  short_url_id: string;
}

const createUrlFunction = async (Url: Url) => {
  const { link, url_name, short_url_id } = Url;
  try {
    const createUrlQueryResponse = await Pool.query(createUrl, [
      link,
      url_name,
      short_url_id,
    ]);
    return createUrlQueryResponse;
  } catch (error) {
    throw error;
  }
};

export default async (req: Request, res: Response) => {
  const { link, url_name, short_url_id } = req.body;

  const createdUrl = await createUrlFunction({ link, url_name, short_url_id });

  res.json({
    statusMessage: "Success",
    message: "Url Created Successfully",
    data: createdUrl,
  });
};
