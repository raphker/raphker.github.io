const Image = require("@11ty/eleventy-img");
const path = require("path");

let logged = false;
/** @param {import('@11ty/eleventy').UserConfig} config */
module.exports = function (config) {
  config.addShortcode(
    "image",
    async (
      src,
      alt,
      widths = ["auto"],
      sizes = undefined,
      lazy = true,
      formats = ["webp", "jpeg"]
    ) => {
      // remove "/", if existing, from the start of the filePath
      const imgPath = src.replace(/^\//, "");

      const imageMetadata = await Image(imgPath, {
        widths,
        formats,
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
  config.addShortcode(
    "image_by_height",
    /**
     * @param {string} src
     * @param {string} alt
     * @param {number} height
     * @returns
     */
    async (src, alt, height, lazy = false) => {
      // remove "/", if existing, from the start of the filePath
      const imgPath = src.replace(/^\//, "");
      const [rawData] = Image.statsSync(imgPath, {
        widths: ["auto"],
        formats: "jpeg",
        urlPath: "/img",
      }).jpeg;
      const imageRatio = rawData.width / rawData.height;

      const imageMetadata = await Image(imgPath, {
        widths: [Math.ceil(height * imageRatio)],
        formats: ["webp", "png"],
        outputDir: path.join(config.dir.output, "img"),
        urlPath: "/img",
      });

      let imageAttributes = {
        alt,
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
