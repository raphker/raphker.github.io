const postcss = require("postcss");
const atImport = require("postcss-import");
const minify = require("postcss-minify");
const presetEnv = require("postcss-preset-env");
const utopia = require("postcss-utopia");

/** @param {import('@11ty/eleventy').UserConfig} config */
module.exports = function (config) {
  config.addTemplateFormats("css");
  config.addExtension("css", {
    outputFileExtension: "css",
    compile: async function (content, inputPath) {
      if (inputPath !== "./content/styles/index.css") {
        return;
      }
      return async () => {
        const { css } = await postcss([
          atImport,
          utopia,
          presetEnv({
            stage: 1,
            browsers: "> 0.2% and not dead",
          }),
          // minify,
        ]).process(content, {
          from: inputPath,
        });
        return css;
      };
    },
  });
};
