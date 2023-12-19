CREATE TABLE short_url (
   short_url_id serial PRIMARY KEY,
   person_id INT NOT NULL REFERENCES person(person_id),
   short_url_name VARCHAR ( 50 ),
   short_url_link VARCHAR ( 50 ) UNIQUE
);

CREATE TABLE website (
   website_id serial PRIMARY KEY,
   website_link VARCHAR ( 50 ) NOT NULL,
   website_image VARCHAR ( 50 ),
   website_name VARCHAR ( 50 )
);

CREATE TABLE url (
   url_id serial PRIMARY KEY,
   link TEXT NOT NULL,
   url_name TEXT,
   short_url_id INT REFERENCES short_url(short_url_id) ON DELETE CASCADE
);

CREATE TABLE url_website (
   url_website_id serial PRIMARY KEY,
   url_id INT REFERENCES url(url_id) ON DELETE CASCADE,
   website_id INT REFERENCES website(website_id) ON DELETE CASCADE
);

CREATE TABLE person (
   person_id SERIAL PRIMARY KEY,
   firstname VARCHAR ( 50 ) NOT NULL,
   lastname VARCHAR ( 50 ) NOT NULL,
   email VARCHAR ( 50 ) NOT NULL UNIQUE,
   password VARCHAR ( 50 ) NOT NULL,
   profile_pic_url VARCHAR ( 255 )
);