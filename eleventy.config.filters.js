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

  config.addFilter("i18n", function (content) {
    return this.ctx.i18n[content.trim()]?.[this.ctx.lang] ?? content;
  });

  config.addFilter("distribute", (items, columns) => {
    const results = new Array(columns);
    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      const col = i % columns;
      if (results[col]) results[col].push(element);
      else results[col] = [element];
    }
    return results;
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
