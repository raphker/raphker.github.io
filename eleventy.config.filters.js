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

  config.addFilter(
    "sort_by_priority",
    /** @param {{data:{priority?:number}}[]} collection */
    (collection) =>
      collection.sort((a, b) => {
        const first = a.data.priority ?? 0;
        const second = b.data.priority ?? 0;
        return second - first;
      })
  );
};
