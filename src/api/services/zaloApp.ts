import axios from 'axios'

export async function putZaloAppPageById(payload: {
  id: string
  name?: string
}): Promise<PutZaloAppPageByIdResponse> {
  const { id, name } = payload
  const { data } = await axios({
    url: `/zaloApps/pages/${id}`,
    method: 'PUT',
    data: { name }
  })
  return data
}

export async function deleteZaloAppPageById(payload: {
  id: string
}): Promise<DeleteZaloAppPageByIdResponse> {
  const { id } = payload
  const { data } = await axios({
    url: `/zaloApps/pages/${id}`,
    method: 'DELETE'
  })
  return data
}

export async function getZaloAppPageById(payload: {
  id: string
}): Promise<GetZaloAppPageByIdResponse> {
  const { id } = payload
  const { data } = await axios({
    url: `/zaloApps/pages/${id}`,
    method: 'GET'
  })
  return data
}

export async function getZaloApps(): Promise<GetZaloAppsResponse> {
  const { data } = await axios({
    url: '/zaloApps',
    method: 'GET'
  })
  return data
}

export async function postZaloApps(payload: {
  name?: string
  key?: string
  secret?: string
}): Promise<PostZaloAppsResponse> {
  const { name, key, secret } = payload
  const { data } = await axios({
    url: '/zaloApps',
    method: 'POST',
    data: { name, key, secret }
  })
  return data
}

export async function getZaloAppById(payload: {
  id: string
}): Promise<GetZaloAppByIdResponse> {
  const { id } = payload
  const { data } = await axios({
    url: `/zaloApps/${id}`,
    method: 'GET'
  })
  return data
}

export async function deleteZaloAppById(payload: {
  id: string
}): Promise<DeleteZaloAppByIdResponse> {
  const { id } = payload
  const { data } = await axios({
    url: `/zaloApps/${id}`,
    method: 'DELETE'
  })
  return data
}
