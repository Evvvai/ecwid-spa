import Cookie from "js-cookie";

const languageKey = "language";
export const getLanguage = () => Cookie.get("language");
export const setLanguage = (language: string) => Cookie.set(languageKey, language);
