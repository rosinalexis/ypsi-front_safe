const { defineConfig } = require("@vue/cli-service");

process.env.VUE_APP_HTTP_API_URL="https://bobo/api/";

module.exports = defineConfig({
  transpileDependencies: true,
});
