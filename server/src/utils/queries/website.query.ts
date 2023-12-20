export const getAllWebsite =
  "SELECT website_id, website_image, website_link, website_name FROM website";

export const deleteWebsite = "DELETE FROM website WHERE id=$1";

export const createWebsite =
  "INSERT INTO website (website_link, website_image, website_name) VALUES($1, $2, $3)";
