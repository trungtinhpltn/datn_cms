import { _t } from 'contexts/i18n'

export enum StatusType {
  OFFLINE = 'false',
  ONLINE = 'true'
}

export enum StateType {
  BUSY = 'busy',
  FREE = 'free'
}

export const StatusTypeOptions = [
  { value: StatusType.OFFLINE, label: 'OFFLINE' },
  { value: StatusType.ONLINE, label: 'ONLINE' }
]

export const StateTypeOptions = [
  { value: StateType.BUSY, label: _t('type.busy') },
  { value: StateType.FREE, label: _t('type.free') }
]
