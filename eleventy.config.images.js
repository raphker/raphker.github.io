const Image = require("@11ty/eleventy-img");

/** @param {import('@11ty/eleventy').UserConfig} config */
module.exports = function (config) {
  config.addShortcode("image", async function (src, alt) {
    let metadata = await Image(src, {
      width: 800,
      formats: ["webp", "jpeg"],
      outputDir: "./_site/img/",
    });

    let imageAttributes = {
      alt,
      loading: "lazy",
      decoding: "async",
    };

    // You bet we throw an error on a missing alt (alt="" works okay)
    return Image.generateHTML(metadata, imageAttributes);
  });
};
