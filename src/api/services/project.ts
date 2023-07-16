import axios from 'axios'

export async function postProjectByIdApiKey(payload: {
  id: string
}): Promise<PostProjectByIdApiKeyResponse> {
  const { id } = payload
  const { data } = await axios({
    url: `/projects/${id}/apiKey`,
    method: 'POST'
  })
  return data
}

export async function deleteProjectByIdApiKey(payload: {
  id: string
}): Promise<DeleteProjectByIdApiKeyResponse> {
  const { id } = payload
  const { data } = await axios({
    url: `/projects/${id}/apiKey`,
    method: 'DELETE'
  })
  return data
}

export async function getProjects(payload: {
  page?: number
  size?: number
  q?: string
}): Promise<GetProjectsResponse> {
  const { page, size, q } = payload
  const { data } = await axios({
    url: '/projects',
    method: 'GET',
    params: { page, size, q }
  })
  return data
}

export async function postProjects(payload: {
  name: string
  categories: string[]
  isDefault?: boolean
}): Promise<PostProjectsResponse> {
  const { name, categories, isDefault } = payload
  const { data } = await axios({
    url: '/projects',
    method: 'POST',
    data: { name, categories, isDefault }
  })
  return data
}

export async function postProjectsAddChannel(payload: {
  appId: string
  projectId: string
}): Promise<PostProjectsAddChannelResponse> {
  const { appId, projectId } = payload
  const { data } = await axios({
    url: '/projects/add-channel',
    method: 'POST',
    data: { appId, projectId }
  })
  return data
}

export async function postProjectsAddMember(payload: {
  userId: string[]
  role?: MemberRole
  projectId: string
}): Promise<PostProjectsAddMemberResponse> {
  const { userId, role, projectId } = payload
  const { data } = await axios({
    url: '/projects/add-member',
    method: 'POST',
    data: { userId, role, projectId }
  })
  return data
}

export async function getProjectById(payload: {
  id: string
}): Promise<GetProjectByIdResponse> {
  const { id } = payload
  const { data } = await axios({
    url: `/projects/${id}`,
    method: 'GET'
  })
  return data
}

export async function putProjectById(payload: {
  id: string
  name?: string
  categories?: string[]
}): Promise<PutProjectByIdResponse> {
  const { id, name, categories } = payload
  const { data } = await axios({
    url: `/projects/${id}`,
    method: 'PUT',
    data: { name, categories }
  })
  return data
}

export async function deleteProjectById(payload: {
  id: string
}): Promise<DeleteProjectByIdResponse> {
  const { id } = payload
  const { data } = await axios({
    url: `/projects/${id}`,
    method: 'DELETE'
  })
  return data
}
