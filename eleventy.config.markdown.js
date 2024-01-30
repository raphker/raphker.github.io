const eleventyImage = require("@11ty/eleventy-img");
const path = require("node:path");
const implicitFigures = require("markdown-it-image-figures");

/** @param {import('@11ty/eleventy').UserConfig} config */
module.exports = function (config) {
  config.amendLibrary("md", (mdLib) => {
    mdLib.use(implicitFigures);
    mdLib.renderer.rules.image = function (tokens, idx) {
      const token = tokens[idx];
      const file = token.attrGet("src");
      if (!file) return;
      const imgPath = path.join(file);
      const alt = token.content;
      const formats = ["webp", "jpeg"];
      const imageOptions = {
        width: 800,
        formats,
        outputDir: path.join(config.dir.output, "img"),
        urlPath: (process.env.BASEURL ?? "") + "/img",
      };
      const metadata = eleventyImage.statsSync(imgPath, imageOptions);
      eleventyImage(imgPath, imageOptions);
      const imageAttributes = {
        alt,
        loading: "lazy",
        decoding: "async",
      };
      return eleventyImage.generateHTML(metadata, imageAttributes);
    };
  });
};
