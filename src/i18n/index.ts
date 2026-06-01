import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './locales/en.json'
import ar from './locales/ar.json'
import fr from './locales/fr.json'
import es from './locales/es.json'
import ru from './locales/ru.json'
import it from './locales/it.json'
import de from './locales/de.json'

export const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English', dir: 'ltr' },
  { code: 'ar', label: 'Arabic', native: 'العربية', dir: 'rtl' },
  { code: 'fr', label: 'French', native: 'Français', dir: 'ltr' },
  { code: 'es', label: 'Spanish', native: 'Español', dir: 'ltr' },
  { code: 'ru', label: 'Russian', native: 'Русский', dir: 'ltr' },
  { code: 'it', label: 'Italian', native: 'Italiano', dir: 'ltr' },
  { code: 'de', label: 'German', native: 'Deutsch', dir: 'ltr' },
] as const

export type LanguageCode = (typeof LANGUAGES)[number]['code']

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
      fr: { translation: fr },
      es: { translation: es },
      ru: { translation: ru },
      it: { translation: it },
      de: { translation: de },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar', 'fr', 'es', 'ru', 'it', 'de'],
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'otm-lang',
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
  })

// Keep <html> lang/dir in sync with the active language on load and on change.
const applyDir = (lng: string) => {
  const meta = LANGUAGES.find((l) => l.code === lng)
  document.documentElement.lang = lng
  document.documentElement.dir = meta?.dir ?? 'ltr'
}
applyDir(i18n.resolvedLanguage ?? 'en')
i18n.on('languageChanged', applyDir)

export default i18n
