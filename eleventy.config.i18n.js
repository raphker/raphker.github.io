const { EleventyI18nPlugin: eleventyI18nPlugin } = require("@11ty/eleventy");
const siteConfig = require("./data/config.js");

/** @param {import('@11ty/eleventy').UserConfig} config */
module.exports = function (config) {
  config.addPlugin(eleventyI18nPlugin, {
    defaultLanguage: siteConfig.defaultLanguage,
    errorMode: "allow-fallback",
  });
  config.addFilter(
    "favor_lang",
    /**
     * @param {Record<string,any>[]} collection
     * @param {string} langOverride
     * @returns
     */
    function (collection, langOverride) {
      const lang = langOverride || this.page.lang;
      const defaults = collection.filter(
        (el) => el.data.lang === siteConfig.defaultLanguage
      );
      return defaults.map((el) => {
        const slug = el.fileSlug;
        const currentLangItem = collection.find(
          (el) => el.fileSlug === slug && el.data.lang === lang
        );
        return currentLangItem ?? { ...el, isFallback: true };
      });
    }
  );
};
