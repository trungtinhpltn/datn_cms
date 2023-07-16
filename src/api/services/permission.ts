import axios from 'axios'

export async function getPermissions(payload: {
  role: string
}): Promise<GetPermissionsResponse> {
  const { role } = payload
  const { data } = await axios({
    url: '/permissions',
    method: 'GET',
    params: { role }
  })
  return data
}

export async function postPermissions(payload: {
  name?: string
}): Promise<PostPermissionsResponse> {
  const { name } = payload
  const { data } = await axios({
    url: '/permissions',
    method: 'POST',
    data: { name }
  })
  return data
}

export async function deletePermissions(payload: {
  name?: string
}): Promise<DeletePermissionsResponse> {
  const { name } = payload
  const { data } = await axios({
    url: '/permissions',
    method: 'DELETE',
    data: { name }
  })
  return data
}

export async function getPermissionsGroup(): Promise<GetPermissionsGroupResponse> {
  const { data } = await axios({
    url: '/permissions/group',
    method: 'GET'
  })
  return data
}

export async function putPermissionById(payload: {
  id: string
  effect?: string
}): Promise<PutPermissionByIdResponse> {
  const { id, effect } = payload
  const { data } = await axios({
    url: `/permissions/${id}`,
    method: 'PUT',
    data: { effect }
  })
  return data
}
