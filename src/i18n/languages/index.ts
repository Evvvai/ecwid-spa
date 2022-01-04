// myself defined lang
import { Locales } from "@/types";

import enLocale from "./en";
import ruLocale from "./ru";

export const messages = {
  [Locales.enUs]: {
    ...enLocale,
  },
  [Locales.ru]: {
    ...ruLocale,
  },
};
