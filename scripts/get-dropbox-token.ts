import assert from "node:assert";
import http from "node:http";
import { URLSearchParams } from "node:url";

const DROPBOX_APP_CLIENT_ID = process.env.DROPBOX_APP_CLIENT_ID;
assert(DROPBOX_APP_CLIENT_ID, "DROPBOX_APP_CLIENT_ID environment must be set");
const DROPBOX_APP_CLIENT_SECRET = process.env.DROPBOX_APP_CLIENT_SECRET;
assert(
  DROPBOX_APP_CLIENT_SECRET,
  "DROPBOX_APP_CLIENT_SECRET environment must be set",
);

const PORT = 8592; // Redirect URI you set in the Dropbox App Console
const REDIRECT_URI = `http://localhost:${PORT}/callback`;
// Step 1: Generate the authorization URL

const authorizationUrl = `https://www.dropbox.com/oauth2/authorize?${new URLSearchParams(
  {
    client_id: DROPBOX_APP_CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    token_access_type: "offline",
  },
).toString()}`;

// Start an HTTP server to listen for the callback
const server = http.createServer(async (req, res) => {
  // Callback URL will contain the authorization code in the query string
  if (req.url && req.url.startsWith("/callback")) {
    const urlParams = new URLSearchParams(req.url.split("?")[1]);
    const code = urlParams.get("code");

    if (code) {
      try {
        // Step 2: Exchange the authorization code for access and refresh tokens
        const tokenUrl = "https://api.dropboxapi.com/oauth2/token";
        const body = new URLSearchParams({
          code,
          grant_type: "authorization_code",
          client_id: DROPBOX_APP_CLIENT_ID,
          client_secret: DROPBOX_APP_CLIENT_SECRET,
          redirect_uri: REDIRECT_URI,
        });

        const response = await fetch(tokenUrl, {
          method: "POST",
          body,
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        const data = await response.json();

        if (response.ok) {
          // Step 3: Output the tokens
          console.log("Access Token:", data.access_token);
          console.log("Refresh Token:", data.refresh_token);

          // Send a success message to the user
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("OAuth successful! You can now close this window.");

          // Close the server after receiving the callback
          server.close();
        } else {
          console.error("Error fetching tokens:", data);
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Error during OAuth process");
        }
      } catch (error) {
        console.error("Error during OAuth process:", error);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error during OAuth process");
      }
    } else {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Error: Authorization code is missing");
    }
  } else {
    // Redirect the user to the Dropbox authorization URL
    res.writeHead(302, { Location: authorizationUrl });
    res.end();
  }
});

// Step 3: Start the server
server.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
  console.log(`Please visit the following URL to authorize the app:`);
  console.log(authorizationUrl);
});
