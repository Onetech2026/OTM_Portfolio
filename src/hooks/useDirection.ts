import { useTranslation } from 'react-i18next'

export type Direction = 'ltr' | 'rtl'

/** Returns the layout direction for the active language. */
export const useDirection = (): Direction => {
  const { i18n } = useTranslation()
  return i18n.language === 'ar' ? 'rtl' : 'ltr'
}
