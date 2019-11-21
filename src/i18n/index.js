import en from "./en";
import fr from "./fr";

const getLanguageJson = locale => {
  switch (locale) {
    default:
    case "fr":
      return fr;
    case "en":
      return en;
  }
};

export const getTranslations = (key, locale, translationArguments = {}) => {
  const translations = getLanguageJson(locale);

  let translatedText = translations[key] || key || "";

  Object.keys(translationArguments).map(argument => {
    translatedText = translatedText.replace(
      `%${argument.toLowerCase()}%`,
      translationArguments[argument],
    );
    return null;
  });

  if (translatedText.length > 1) {
    const splitted = translatedText.split("\\n");
    let finalText = splitted[0];
    if (splitted.length > 1) {
      splitted.map((s, i) => {
        if (i > 0) {
          finalText = `${finalText}\n${s}`;
        }
        return null;
      });
    }
    return finalText;
  }
  return translatedText;
};
