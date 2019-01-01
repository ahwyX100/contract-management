import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const loadedLanguages = ['en']

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
  	'en': require('./source/en.js')
  }
})

function setI18nLanguage (lang) {
  i18n.locale = lang
  return lang
}

export function loadLanguageAsync (lang) {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return import(/* webpackChunkName: "lang-[request]" */ `./source/${lang}.js`).then(msgs => {
        i18n.setLocaleMessage(lang, msgs)
        loadedLanguages.push(lang)
        return setI18nLanguage(lang)
      })
    } 
    return Promise.resolve(setI18nLanguage(lang))
  }
  return Promise.resolve(lang)
}

export default i18n
