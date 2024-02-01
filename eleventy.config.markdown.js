const eleventyImage = require("@11ty/eleventy-img");
const path = require("node:path");

function imagesWrapperPlugin(md, options) {
  options = options || {};

  function imagesWrapper(state) {
    for (let i = 1; i < state.tokens.length - 1; i++) {
      const prevToken = state.tokens[i - 1];
      const token = state.tokens[i];
      const nextToken = state.tokens[i + 1];
      if (token.type !== "inline") {
        continue;
      }
      if (
        prevToken.type !== "paragraph_open" ||
        nextToken.type !== "paragraph_close"
      )
        continue;
      if (
        token.children.some(
          (el) => el.type !== "image" && el.type !== "softbreak"
        )
      )
        continue;
      state.tokens[i - 1].attrPush(["class", "imagesRow"]);
    }
  }

  md.core.ruler.before("linkify", "images_wrapper", imagesWrapper);
}

/** @param {import('@11ty/eleventy').UserConfig} config */
module.exports = function (config) {
  config.amendLibrary("md", (mdLib) => {
    mdLib.use(imagesWrapperPlugin);

    mdLib.renderer.rules.image = function (tokens, idx) {
      const token = tokens[idx];
      const file = token.attrGet("src");
      if (!file) return;
      // remove "/", if existing, from the start of the filePath
      const imgPath = file.replace(/^\//, "");
      const alt = token.content;
      const imageOptions = {
        widths: ["auto"],
        formats: ["webp", "jpeg"],
        outputDir: path.join(config.dir.output, "img"),
        urlPath: "/img",
      };
      const placeholderOptions = {
        widths: [4],
        formats: "jpeg",
        outputDir: path.join(config.dir.output, "img"),
        urlPath: "/img",
      };

      const metadata = eleventyImage.statsSync(imgPath, imageOptions);
      const placeholderMetadata = eleventyImage.statsSync(
        imgPath,
        placeholderOptions
      );
      const data = metadata.jpeg[metadata.jpeg.length - 1];
      const placeHoldersData =
        placeholderMetadata.jpeg[metadata.jpeg.length - 1];
      eleventyImage(imgPath, imageOptions);
      eleventyImage(imgPath, placeholderOptions);
      return `
      <picture style="--ratio:${
        data.width / data.height
      }; background-image:url('${placeHoldersData.url}')">
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
