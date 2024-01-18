const esbuild = require("esbuild");

/** @param {import('@11ty/eleventy').UserConfig} config */
module.exports = function (config) {
  config.addTemplateFormats("js");

  config.addExtension("js", {
    outputFileExtension: "js",
    compile: async (content, path) => {
      if (path !== "./scripts/index.js") {
        return;
      }

      return async () => {
        let output = await esbuild.build({
          target: "es2020",
          entryPoints: [path],
          minify: true,
          bundle: true,
          write: false,
        });

        return output.outputFiles[0].text;
      };
    },
  });
};
