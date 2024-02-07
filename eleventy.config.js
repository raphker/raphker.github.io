const processCssConfig = require("./eleventy.config.styles.js");
const processJsConfig = require("./eleventy.config.scripts.js");
const i18nConfig = require("./eleventy.config.i18n.js");
const imagesConfig = require("./eleventy.config.images.js");
const mdConfig = require("./eleventy.config.markdown.js");
const filters = require("./eleventy.config.filters.js");
const syntaxHighlight = require("./eleventy.config.syntaxHighlight.js");

/** @param {import('@11ty/eleventy').UserConfig} config */
module.exports = function (config) {
  config.addPassthroughCopy({
    "./public/": "/",
  });

  i18nConfig(config);
  processCssConfig(config);
  processJsConfig(config);
  imagesConfig(config);
  mdConfig(config);
  filters(config);
  syntaxHighlight(config);

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
