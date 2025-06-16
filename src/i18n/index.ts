import { createI18n } from 'vue-i18n'
import enUS from './locales/en-US.json'

export default createI18n({
  locale: 'en-US',
  fallbackLocale: 'en-US',
  messages: {
    'en-US': enUS
  }
})