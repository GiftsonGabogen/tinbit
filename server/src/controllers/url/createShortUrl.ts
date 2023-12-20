import { Request, Response } from "express";
import "@utils/config";
import { createShortUrl } from "@utils/queries";
import Pool from "@utils/db";

interface ShortUrl {
  person_id: string;
  short_url_name: string;
  short_url_link: string;
}

const createShortUrlFunction = async (shortUrl: ShortUrl) => {
  console.log(shortUrl);
  const { person_id, short_url_name, short_url_link } = shortUrl;
  try {
    const createShortUrlQueryResponse = await Pool.query(createShortUrl, [
      person_id,
      short_url_name,
      short_url_link,
    ]);
    return createShortUrlQueryResponse;
  } catch (error) {
    throw error;
  }
};

export default async (req: Request, res: Response) => {
  console.log(req.body);
  const { person_id, short_url_name, short_url_link } = req.body;

  const createdShortUrl = await createShortUrlFunction({
    person_id,
    short_url_name,
    short_url_link,
  });

  res.json({
    statusMessage: "Success",
    message: "ShortUrl Created Successfully",
    data: createdShortUrl,
  });
};
