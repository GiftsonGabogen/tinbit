export const getShortUrlWithUrlsAndWebsites = `
  SELECT
    short_url.short_url_link,
    url.link,
    website.website_image,
    website.website_name
  FROM
    short_url
  JOIN
    url ON short_url.short_url_id = url.short_url_id
  JOIN
    url_website ON url_website.url_id = url.url_id
  JOIN
    website ON website.website_id = url_website.website_id
  WHERE
    short_url.short_url_link = $1
`;

export const createShortUrl =
  "INSERT INTO short_url (person_id, short_url_name, short_url_link) VALUES($1, $2, $3)";
