import type { MessageId } from 'contexts/i18n'

export {}

declare global {
  export interface Window {
    _t: (id: MessageId, defaultMessage?: string) => string
    moment: (props: any) => any
  }
}
