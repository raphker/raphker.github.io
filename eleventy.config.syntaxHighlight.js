const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

/** @param {import('@11ty/eleventy').UserConfig} config */
module.exports = function (config) {
  config.addPlugin(syntaxHighlight);
};
