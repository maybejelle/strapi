const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: [
    "mqtt", // Specify the mqtt package here
  ],
});
