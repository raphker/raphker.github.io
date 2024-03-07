const esbuild = require("esbuild");

/** @param {import('@11ty/eleventy').UserConfig} config */
module.exports = function (config) {
  config.addTemplateFormats("ts");

  config.addExtension("ts", {
    outputFileExtension: "ts",
    outputFileExtension: "js",
    compile: async (_, path) => {
      if (path !== "./content/scripts/index.ts") return;
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
