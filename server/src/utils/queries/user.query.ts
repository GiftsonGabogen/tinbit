export const createPerson =
  "INSERT INTO person (firstname, lastname, email, password, profile_pic_url) VALUES($1, $2, $3, $4, $5) RETURNING person_id, firstname, lastname, email, profile_pic_url";
export const getUser =
  "SELECT firstname, lastname, email, profile_pic_url FROM person WHERE email=$1";
export const checkEmailIfExists = "SELECT email FROM person WHERE email=$1";
export const getAllShortURLWithURLSByPersonId = `
SELECT
    short_url.short_url_name,
    short_url.short_url_link,
    url.url_name,
    url.url_id,
    url.link,
    url.url_name,
    website.website_name,
    website.website_image,
    website.website_link
FROM
    person
JOIN
    short_url ON person.person_id = short_url.person_id
JOIN
    url ON short_url.short_url_id = url.short_url_id
JOIN
    url_website ON url.url_id = url_website.url_id
JOIN
    website ON url_website.website_id = website.website_id
WHERE
    person.person_id = $1`;
