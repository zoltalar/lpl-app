import { createI18n } from 'vue-i18n'
import en from '../locales/en-us.json'

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    warnHtmlMessage: false,
    locale: 'en-us',
    messages: {
      en
    }
  })
  vueApp.use(i18n)
})