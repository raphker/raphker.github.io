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
     * @param {string} [langOverride]
     */
    function (collection, langOverride) {
      const lang = langOverride || this.page.lang;
      const defaults = collection.filter(
        (el) => el.data.lang === siteConfig.defaultLanguage
      );
      return defaults.map((el) => {
        const re = new RegExp(`^\/${siteConfig.defaultLanguage}\/`);
        const target = el.filePathStem.replace(re, `/${lang}/`);
        const currentLangItem = collection.find(
          (el) => el.filePathStem === target && el.data.lang === lang
        );
        return currentLangItem ?? { ...el, isFallback: true };
      });
    }
  );

  config.addFilter(
    "filter_by_lang",
    /**
     * @param {Record<string,any>[]} collection
     * @param {[string]} lang
     */
    function (collection, lang) {
      const currentLang = lang || this.page.lang;
      return collection.filter((el) => el.data.lang === currentLang);
    }
  );
};
