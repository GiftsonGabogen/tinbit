export const createPerson =
  "INSERT INTO person (firstname, lastname, email, password, profile_pic_url) VALUES($1, $2, $3, $4, $5) RETURNING person_id, firstname, lastname, email, profile_pic_url";
export const getUser =
  "SELECT firstname, lastname, email, profile_pic_url FROM person WHERE email=$1";
export const checkEmailIfExists = "SELECT email FROM person WHERE email=$1";

export const getAllWebsite =
  "SELECT website_id, website_image, website_link, website_name FROM website";

export const deleteWebsite = "DELETE FROM website WHERE id=$1";

export const getAllShortURLWithURLSByPersonId = `
SELECT
    short_url.short_url_value AS short_url,
    url.url_value AS url,
    website.website_name,
    website.website_image,
    website.website_link,
FROM
    person
JOIN
    short_url ON person.person_id = short_url.person_id
JOIN
    url ON short_url.short_url_id = url.short_url_id
JOIN
    website_url ON url.url_id = website_url.url_id
JOIN
    website ON website_url.website_id = website.website_id
WHERE
    person.person_id = $1`;
