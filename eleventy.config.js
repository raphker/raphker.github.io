const processCssConfig = require("./config/styles.config.js");
const processJsConfig = require("./config/scripts.config.js");

/** @param {import('@11ty/eleventy').UserConfig} config */
module.exports = function (config) {
  processCssConfig(config);
  processJsConfig(config);
  return {
    dir: {
      layouts: "../layouts",
      includes: "../includes",
      input: "content",
    },
  };
};
