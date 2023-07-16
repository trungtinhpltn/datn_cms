import axios from 'axios'

export async function putFacebookAppPageById(payload: {
  id: string
  projectId?: string
}): Promise<PutFacebookAppPageByIdResponse> {
  const { id, projectId } = payload
  const { data } = await axios({
    url: `/facebookApps/pages/${id}`,
    method: 'PUT',
    data: { projectId }
  })
  return data
}

export async function deleteFacebookAppPageById(payload: {
  id: string
}): Promise<DeleteFacebookAppPageByIdResponse> {
  const { id } = payload
  const { data } = await axios({
    url: `/facebookApps/pages/${id}`,
    method: 'DELETE'
  })
  return data
}

export async function getFacebookAppPageById(payload: {
  id: string
}): Promise<GetFacebookAppPageByIdResponse> {
  const { id } = payload
  const { data } = await axios({
    url: `/facebookApps/pages/${id}`,
    method: 'GET'
  })
  return data
}

export async function getFacebookApps(): Promise<GetFacebookAppsResponse> {
  const { data } = await axios({
    url: '/facebookApps',
    method: 'GET'
  })
  return data
}

export async function postFacebookApps(payload: {
  name?: string
  key?: string
  secret?: string
}): Promise<PostFacebookAppsResponse> {
  const { name, key, secret } = payload
  const { data } = await axios({
    url: '/facebookApps',
    method: 'POST',
    data: { name, key, secret }
  })
  return data
}

export async function getFacebookAppById(payload: {
  id: string
}): Promise<GetFacebookAppByIdResponse> {
  const { id } = payload
  const { data } = await axios({
    url: `/facebookApps/${id}`,
    method: 'GET'
  })
  return data
}

export async function deleteFacebookAppById(payload: {
  id: string
}): Promise<DeleteFacebookAppByIdResponse> {
  const { id } = payload
  const { data } = await axios({
    url: `/facebookApps/${id}`,
    method: 'DELETE'
  })
  return data
}
