// Add above your Eleventy config
const markdownIt = require("markdown-it");

/** @param {import('@11ty/eleventy').UserConfig} config */
module.exports = function (config) {
  const md = new markdownIt({
    html: true,
  });

  config.addFilter("parse_markdown", (content) => {
    return md.render(content ?? "");
  });
};
