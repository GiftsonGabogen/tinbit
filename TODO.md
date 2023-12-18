C = Client, S - Server

Register

- [x] C - register in with google
- [x] C - send code to server
- [x] S - decode code to get access_token, refresh and jwt
- [x] S - get user info(name, email, etc.) to send back to front end
- [x] C - autopopulate firstname, lastname on input, editable, save the email on memory
- [x] C - if register complete,save info to state, save the access_token and refresh to the local storage or cookie, then send the info to server
- [x] S - save the info to the database

Login

- [x] C - go to a protected route
- [x] C - check state(memory) if there is a user login, access granted else
- [ ] C - check the access and refresh token from local storage or cookie, then validate on backend. [DOING] continue on after refresh token get again the user info then return to the client and on client save the info on state
- [ ] S - validate tokens, if access is expired, get new access token using refresh. if successful, send back to

CSS

- [x] - menu: Logo, My Account, Hamburger - Home, Urls, About
- [x] - Register field
- [ ] - My Account

URL Shortener

- [ ]
- [ ]

Improvements

- currently when registering, it saves names, profile pic, etc on db. we can remove the saving of data to db, we can just use the data retrieved everytime the user login or register from the google itself, we just need to get the email because email is the unique identifier.

for setting up path aliases
https://dev.to/oieduardorabelo/comment/ogda
