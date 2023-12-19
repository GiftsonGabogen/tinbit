import { Request, Response } from "express";
import "@utils/config";
import { createWebsite } from "@utils/queries";
import Pool from "@utils/db";

interface Website {
  website_link: string;
  website_image: string;
  website_name: string;
}

const createWebsiteFunction = async (websites: Website[]) => {
  const createdWebsites = websites.map(async (website) => {
    const { website_link, website_image, website_name } = website;
    try {
      const createWebsiteQueryResponse = await Pool.query(createWebsite, [
        website_link,
        website_image,
        website_name,
      ]);
      return createWebsiteQueryResponse;
    } catch (error) {
      throw error;
    }
  });

  return createdWebsites;
};

export default async (req: Request, res: Response) => {
  const { websites } = req.body;

  const createdWebsites = await createWebsiteFunction(websites);

  const createdWebsiteRes = await Promise.all(createdWebsites);

  res.json({
    statusMessage: "Success",
    message: "Websites Created Successfully",
    data: createdWebsiteRes,
  });
};
