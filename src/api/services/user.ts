import axios from 'axios'

export async function postUserByIdChangeProjectRole(payload: {
  id: string
  role?: UserRole
  projectIds?: string[]
}): Promise<PostUserByIdChangeProjectRoleResponse> {
  const { id, role, projectIds } = payload
  const { data } = await axios({
    url: `/users/${id}/change-project-role`,
    method: 'POST',
    data: { role, projectIds }
  })
  return data
}

export async function postUsers(payload: {
  name: string
  email: string
  projectIds?: string[]
  role: UserRole
  phoneNumber?: string
}): Promise<PostUsersResponse> {
  const { name, email, projectIds, role, phoneNumber } = payload
  const { data } = await axios({
    url: '/users',
    method: 'POST',
    data: { name, email, projectIds, role, phoneNumber }
  })
  return data
}

export async function getUsers(payload: {
  page?: number
  size?: number
  projectId?: string
  q?: string
  role?: UserRole
}): Promise<GetUsersResponse> {
  const { page, size, projectId, q, role } = payload
  const { data } = await axios({
    url: '/users',
    method: 'GET',
    params: { page, size, projectId, q, role }
  })
  return data
}

export async function getUsersExports(payload: {
  page?: number
  size?: number
  projectId?: string
  q?: string
  role?: UserRole
  email: string
}): Promise<GetUsersExportsResponse> {
  const { page, size, projectId, q, role, email } = payload
  const { data } = await axios({
    url: '/users/exports',
    method: 'GET',
    params: { page, size, projectId, q, role, email }
  })
  return data
}

export async function getUserById(payload: {
  id: string
}): Promise<GetUserByIdResponse> {
  const { id } = payload
  const { data } = await axios({
    url: `/users/${id}`,
    method: 'GET'
  })
  return data
}

export async function putUserById(payload: {
  id: string
  name?: string
  projectIds?: string[]
  role?: UserRole
  phoneNumber?: string
  avatar?: string
  active?: boolean
  isNotification?: boolean
  state?: UserState
  isOnline?: boolean
}): Promise<PutUserByIdResponse> {
  const {
    id,
    name,
    projectIds,
    role,
    phoneNumber,
    avatar,
    active,
    isNotification,
    state,
    isOnline
  } = payload
  const { data } = await axios({
    url: `/users/${id}`,
    method: 'PUT',
    data: {
      name,
      projectIds,
      role,
      phoneNumber,
      avatar,
      active,
      isNotification,
      state,
      isOnline
    }
  })
  return data
}

export async function deleteUserById(payload: {
  id: string
}): Promise<DeleteUserByIdResponse> {
  const { id } = payload
  const { data } = await axios({
    url: `/users/${id}`,
    method: 'DELETE'
  })
  return data
}
