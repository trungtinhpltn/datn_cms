import axios from 'axios'

export async function getSettings(payload: {
  q?: string
  settingType?: SettingType
  active?: boolean
  page?: number
  size?: number
}): Promise<GetSettingsResponse> {
  const { q, settingType, active, page, size } = payload
  const { data } = await axios({
    url: '/settings',
    method: 'GET',
    params: { q, settingType, active, page, size }
  })
  return data
}

export async function postSettings(payload: {
  name: string
  settingType: SettingType
  description?: string
  isFullCondition: boolean
  conditions?: ICondition[]
  actions?: IAction[]
}): Promise<PostSettingsResponse> {
  const {
    name,
    settingType,
    description,
    isFullCondition,
    conditions,
    actions
  } = payload
  const { data } = await axios({
    url: '/settings',
    method: 'POST',
    data: {
      name,
      settingType,
      description,
      isFullCondition,
      conditions,
      actions
    }
  })
  return data
}

export async function getSettingsAssignTicket(): Promise<GetSettingsAssignTicketResponse> {
  const { data } = await axios({
    url: '/settings/assignTicket',
    method: 'GET'
  })
  return data
}

export async function putSettingsAssignTicket(payload: {
  isAutoAssign?: boolean
  memberAssignType?: UserRole
  isFree?: boolean
  maxTicket?: number
  isSmallerTicket?: boolean
  isEndTicketSoon?: boolean
}): Promise<PutSettingsAssignTicketResponse> {
  const {
    isAutoAssign,
    memberAssignType,
    isFree,
    maxTicket,
    isSmallerTicket,
    isEndTicketSoon
  } = payload
  const { data } = await axios({
    url: '/settings/assignTicket',
    method: 'PUT',
    data: {
      isAutoAssign,
      memberAssignType,
      isFree,
      maxTicket,
      isSmallerTicket,
      isEndTicketSoon
    }
  })
  return data
}

export async function getSettingById(payload: {
  id: string
}): Promise<GetSettingByIdResponse> {
  const { id } = payload
  const { data } = await axios({
    url: `/settings/${id}`,
    method: 'GET'
  })
  return data
}

export async function deleteSettingById(payload: {
  id: string
}): Promise<DeleteSettingByIdResponse> {
  const { id } = payload
  const { data } = await axios({
    url: `/settings/${id}`,
    method: 'DELETE'
  })
  return data
}

export async function putSettingById(payload: {
  id: string
  name: string
  active?: boolean
  settingType: SettingType
  description?: string
  isFullCondition: boolean
  conditions?: ICondition[]
  actions?: IAction[]
}): Promise<PutSettingByIdResponse> {
  const {
    id,
    name,
    active,
    settingType,
    description,
    isFullCondition,
    conditions,
    actions
  } = payload
  const { data } = await axios({
    url: `/settings/${id}`,
    method: 'PUT',
    data: {
      name,
      active,
      settingType,
      description,
      isFullCondition,
      conditions,
      actions
    }
  })
  return data
}
