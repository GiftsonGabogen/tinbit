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
- [x] C - check the access and refresh token from local storage or cookie, then validate on backend. [DOING] continue on after refresh token get again the user info then return to the client and on client save the info on state
- [x] S - validate tokens, if access is expired, get new access token using refresh. if successful, send back to

CSS

- [x] - menu: Logo, My Account, Hamburger - Home, Urls, About
- [x] - Register field
- [x] - My Account

Displaying Links

- [x] - Add Routing for the pages - FE
- [ ] - Display Links with the images
  - [ ] - user go to page, front end call to server using the page unique link - FE
  - [ ] - server get the unique link, server call to db to get the page info - SS
  - [ ] - server send back the info to the client - SS
  - [ ] - client get the info then extract it - FE
  - [ ] - display the links with the info - FE
- [ ] - add websites and info
  - [ ] - get logos, website name of every possible website
  - [ ] - add it to the database - Postman, etc
- [ ] - on user login or re auth, fetch list of websites
  - [ ] - create redux for websites - FE
  - [ ] - create fetch all websites data on server - SS
  - [ ] - return websites info - SS
  - [ ] - create set websites using redux setState - FE
  - [ ] - on login, fetch websites - FE
  - [ ] - after fetched, save into redux state - FE
- [ ] - Add Create Link functionality - Front End
  - [ ] - Create Modal with form of Add Name - FE
  - [ ] - Second Step after Add Name is Add Links - FE
  - [ ] - Add Links - input link, autodetects the website and autofill the logo - FE
  - [ ] - make an add button on input link to add more links - FE
  - [ ] - create save short link action - FE
  - [ ] - on submit, use save short link action - FE
  - [ ] - create save short link on server - SS
  - [ ] - after save, save to redux using reducer - FE

URL Shortener

- [ ]
- [ ]

Improvements

- currently when registering, it saves names, profile pic, etc on db. we can remove the saving of data to db, we can just use the data retrieved everytime the user login or register from the google itself, we just need to get the email because email is the unique identifier.

for setting up path aliases
https://dev.to/oieduardorabelo/comment/ogda
