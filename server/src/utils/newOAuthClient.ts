import { OAuth2Client } from "google-auth-library";
import "@utils/config";

export default () => {
  return new OAuth2Client(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    "postmessage" // CRITICAL: this needs to be postmessage if you get the token from client then send it to server
  );
};
