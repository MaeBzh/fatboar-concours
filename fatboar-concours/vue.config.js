const fs = require("fs");
const webpack = require("webpack");
const dotenv = require("dotenv");
const resolve = require("path").resolve;
dotenv.config({ path: resolve(__dirname, ".env") });

 var config = {
  devServer: {
    compress: true,
    port: 8080,
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        // allow access to process.env from within the vue app
        "process.env": {
          NODE_ENV: process.env.NODE_ENV,
          VUE_APP_API_BASE_URL: process.env.VUE_APP_API_BASE_URL,
          VUE_APP_FACEBOOK_APP_ID: process.env.VUE_APP_FACEBOOK_APP_ID,
          VUE_APP_FACEBOOK_VERSION: process.env.VUE_APP_FACEBOOK_VERSION,
          VUE_APP_GOOGLE_CLIENT_ID: process.env.VUE_APP_GOOGLE_CLIENT_ID,
        },
      }),
    ],
  },
};

if(process.env.NODE_ENV === 'production') {
  config = {
    ...config,
    devServer: {
      ...config.devServer,
      https: {
        key: fs.readFileSync("../server.key"),
        cert: fs.readFileSync("../server.cert"),
      },
    }
  };
}

module.exports = config;