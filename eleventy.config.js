const processCssConfig = require("./eleventy.config.styles.js");
const processJsConfig = require("./eleventy.config.scripts.js");
const i18nConfig = require("./eleventy.config.i18n.js");

/** @param {import('@11ty/eleventy').UserConfig} config */
module.exports = function (config) {
  i18nConfig(config);
  processCssConfig(config);
  processJsConfig(config);

  return {
    dir: {
      layouts: "../layouts",
      includes: "../includes",
      data: "../data",
      input: "content",
    },

    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
