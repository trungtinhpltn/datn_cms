import axios from 'axios'

export async function getProfiles(): Promise<GetProfilesResponse> {
  const { data } = await axios({
    url: '/profiles',
    method: 'GET'
  })
  return data
}

export async function putProfiles(payload: {
  name?: string
  phoneNumber?: string
  avatar?: string
}): Promise<PutProfilesResponse> {
  const { name, phoneNumber, avatar } = payload
  const { data } = await axios({
    url: '/profiles',
    method: 'PUT',
    data: { name, phoneNumber, avatar }
  })
  return data
}

export async function postProfilesChangePassword(payload: {
  oldPassword: string
  newPassword: string
}): Promise<PostProfilesChangePasswordResponse> {
  const { oldPassword, newPassword } = payload
  const { data } = await axios({
    url: '/profiles/change-password',
    method: 'POST',
    data: { oldPassword, newPassword }
  })
  return data
}

export async function getProfilesState(): Promise<GetProfilesStateResponse> {
  const { data } = await axios({
    url: '/profiles/state',
    method: 'GET'
  })
  return data
}

export async function putProfilesState(payload: {
  state?: UserState
}): Promise<PutProfilesStateResponse> {
  const { state } = payload
  const { data } = await axios({
    url: '/profiles/state',
    method: 'PUT',
    data: { state }
  })
  return data
}
