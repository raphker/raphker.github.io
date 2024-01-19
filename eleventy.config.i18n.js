const { EleventyI18nPlugin: eleventyI18nPlugin } = require("@11ty/eleventy");

/** @param {import('@11ty/eleventy').UserConfig} config */
module.exports = function (config) {
  config.addPlugin(eleventyI18nPlugin, {
    defaultLanguage: "fr",
    errorMode: "allow-fallback",
  });
  config.addFilter(
    "filterCollectionLang",
    function filterCollectionLang(collection, langOverride) {
      const lang = langOverride || this.page.lang;
      return collection.filter((entry) => entry.data.lang === lang);
    }
  );
};
