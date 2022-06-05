var express = require("express");
var history = require("connect-history-api-fallback");
var https = require("https");
var fs = require("fs");
const { resolve } = require("path");

var httpsOptions = {
  cert: fs.readFileSync(resolve(__dirname, "../server.cert"), "utf8"),
  key: fs.readFileSync(resolve(__dirname, "../server.key"), "utf8"),
};

var app = express();

// Middleware for serving '/dist' directory
const staticFileMiddleware = express.static("dist");

// 1st call for unredirected requests
app.use(staticFileMiddleware);

// Support history api
// this is the HTTP request path not the path on disk
app.use(
  history({
    index: "/index.html",
  })
);

// 2nd call for redirected requests
app.use(staticFileMiddleware);

app.all("*", (_req, res) => {
  try {
    res.sendFile(resolve(__dirname, "dist/index.html"));
  } catch (error) {
    res.json({ success: false, message: "Something went wrong." });
  }
});

var server = https.createServer(httpsOptions, app);
server.listen(8081, function () {
  console.log("Listening on port 8081");
});
