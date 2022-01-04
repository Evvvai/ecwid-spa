///////////////////////////////////////////////////////////////////////////
// Locales

import { Locales } from "@/types";

interface I18nLanguage {
  param: string;
  title: string;
}

export const LayoutLanguages: Array<I18nLanguage> = [
  {
    param: Locales.enUs,
    title: "English",
  },
  {
    param: Locales.ru,
    title: "Русский",
  },
];

export const defaultLocale = Locales.enUs;
