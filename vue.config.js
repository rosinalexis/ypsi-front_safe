const { defineConfig } = require("@vue/cli-service");

process.env.VUE_APP_HTTP_API_URL="";
module.exports = defineConfig({
  transpileDependencies: true,
});
