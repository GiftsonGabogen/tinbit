export const createShortUrl =
  "INSERT INTO short_url (person_id, short_url_name, short_url_link) VALUES($1, $2, $3)";
