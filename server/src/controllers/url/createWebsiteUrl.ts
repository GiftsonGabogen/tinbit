import { Request, Response } from "express";
import "@utils/config";
import { createWebsiteUrl } from "@utils/queries";
import Pool from "@utils/db";

interface WebsiteUrl {
  url_id: string;
  website_id: string;
}

const createWebsiteUrlFunction = async (WebsiteUrl: WebsiteUrl) => {
  const { url_id, website_id } = WebsiteUrl;
  try {
    const createWebsiteUrlQueryResponse = await Pool.query(createWebsiteUrl, [
      url_id,
      website_id,
    ]);
    return createWebsiteUrlQueryResponse;
  } catch (error) {
    throw error;
  }
};

export default async (req: Request, res: Response) => {
  const { url_id, website_id } = req.body;

  const createdWebsiteUrl = await createWebsiteUrlFunction({
    url_id,
    website_id,
  });

  res.json({
    statusMessage: "Success",
    message: "Website Url Created Successfully",
    data: createdWebsiteUrl,
  });
};
