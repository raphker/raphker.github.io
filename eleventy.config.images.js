const Image = require("@11ty/eleventy-img");
const path = require("path");

/** @param {import('@11ty/eleventy').UserConfig} config */
module.exports = function (config) {
  config.addShortcode(
    "image",
    async (src, alt, widths = ["auto"], sizes = undefined, lazy = true) => {
      // remove "/", if existing, from the start of the filePath
      const imgPath = src.replace(/^\//, "");

      const imageMetadata = await Image(imgPath, {
        widths,
        formats: ["webp", "jpeg"],
        outputDir: path.join(config.dir.output, "img"),
        urlPath: "/img",
      });

      let imageAttributes = {
        alt,
        sizes,
      };
      if (lazy)
        imageAttributes = {
          ...imageAttributes,
          loading: "lazy",
          decoding: "async",
        };

      return Image.generateHTML(imageMetadata, imageAttributes);
    }
  );
};
