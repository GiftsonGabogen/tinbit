import { Request, Response } from "express";
import "@utils/config";
import { getShortUrlWithUrlsAndWebsites } from "@utils/queries";
import Pool from "@utils/db";

interface Url {
  short_url_link: string;
}

const getShortUrlWithUrlsAndWebsitesFunction = async (Url: Url) => {
  const { short_url_link } = Url;
  try {
    const getShortUrlQueryResponse = await Pool.query(
      getShortUrlWithUrlsAndWebsites,
      [short_url_link]
    );
    return getShortUrlQueryResponse;
  } catch (error) {
    throw error;
  }
};

export default async (req: Request, res: Response) => {
  const { short_url_link } = req.query;

  if (typeof short_url_link === "string") {
    const shortUrl = await getShortUrlWithUrlsAndWebsitesFunction({
      short_url_link,
    });

    res.json({
      statusMessage: "Success",
      message: "Get Short Url Link Successfully",
      data: shortUrl?.rows,
    });
  }
};
