import en from 'i18n/en.json'
import vi from 'i18n/vi.json'
import type { FormatXMLElementFn } from 'intl-messageformat'
import { createContext, useContext } from 'react'
import type { PrimitiveType } from 'react-intl'
import { createIntl, createIntlCache, RawIntlProvider } from 'react-intl'

export const resources = { en, vi }
export type MessageId = keyof typeof vi
export type Lang = keyof typeof resources
export const initialLanguage = (localStorage.getItem('lang') || 'vi') as Lang

const cache = createIntlCache()
const intl = createIntl(
  {
    locale: initialLanguage, // hmmm...
    messages: resources[initialLanguage]
  },
  cache
)

export const _t = (
  id: MessageId,
  options?:
    | string
    | {
        defaultMessage?: string
        values: Record<
          string,
          PrimitiveType | FormatXMLElementFn<string, string>
        >
      }
) => {
  if (typeof options === 'string') {
    return intl.formatMessage({ id, defaultMessage: options })
  }
  return intl.formatMessage(
    { id, defaultMessage: options?.defaultMessage },
    options?.values
  )
}

export const I18nContext = createContext<{ _t: typeof _t }>({ _t: () => '' })
export const useI18nContext = () => useContext(I18nContext)
export const I18nProvider = ({ children }: React.PropsWithChildren) => {
  return <I18nContext.Provider value={{ _t }}>{children}</I18nContext.Provider>
}

export default function ({ children }: React.PropsWithChildren) {
  return (
    <RawIntlProvider value={intl}>
      <I18nProvider>{children}</I18nProvider>
    </RawIntlProvider>
  )
}
