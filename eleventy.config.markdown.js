const eleventyImage = require("@11ty/eleventy-img");
const path = require("node:path");

/** @param {import('@11ty/eleventy').UserConfig} config */
module.exports = function (config) {
  config.amendLibrary("md", (mdLib) => {
    mdLib.renderer.rules.image = function (tokens, idx) {
      const token = tokens[idx];
      const file = token.attrGet("src");
      if (!file) return;
      const imgPath = path.join(file);
      const alt = token.content;
      const imageOptions = {
        formats: ["webp", "jpeg"],
        width: 800,
        outputDir: path.join(config.dir.output, "img"),
        urlPath: (process.env.BASEURL ?? "") + "/img",
      };

      const metadata = eleventyImage.statsSync(imgPath, imageOptions);
      eleventyImage(imgPath, imageOptions);
      const data = metadata.jpeg[metadata.jpeg.length - 1];
      return `
      <picture style="--ratio:${data.width / data.height}">
        <source type="${metadata.webp[0].sourceType}" srcset="${
        metadata.webp[0].url
      }"/>
        <img loading="lazy" decoding="async" src="${
          metadata.jpeg[0].url
        }" width="${metadata.jpeg[0].width}" height="${
        metadata.jpeg[0].height
      }" alt="${alt}"/>
      </picture>`;
    };
  });
};
