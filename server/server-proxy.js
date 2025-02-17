var host = process.env.HOST || "localhost";
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 8000;

/**
 * Proxy server was required to avoid preflight issue with https://www.metaweather.com/api APIs
 */
var cors_proxy = require("cors-anywhere");
cors_proxy
  .createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ["origin", "x-requested-with"],
    removeHeaders: ["cookie", "cookie2"]
  })
  .listen(port, host, function() {
    console.log("Running CORS Anywhere on " + host + ":" + port);
  });
