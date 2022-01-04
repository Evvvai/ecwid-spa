import { createI18n } from 'vue-i18n'

import { messages } from './languages'
import { defaultLocale } from './locales'
import { browserStorage } from '@/utils'

const i18n = createI18n({
  messages,
  fallbackLocale: defaultLocale,
  locale: browserStorage.getItem('language'),
})

export default i18n
