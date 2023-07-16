import type { CreateEmployeeDto, IEmployee } from 'models/employee'
import type { CommonResponse } from 'models/response'

import axiosClient from './axiosClient'

export function updateEmployee({
  id,
  data
}: {
  id: number
  data: CreateEmployeeDto
}) {
  const fdata = new FormData()
  Object.entries(data).forEach(([key, val]) => {
    if (val !== undefined) {
      fdata.append(key, val)
    }
  })
  return axiosClient.patch<CommonResponse<IEmployee>>('/employee/' + id, fdata)
}
export function createEmployee(data: CreateEmployeeDto) {
  const fdata = new FormData()
  Object.entries(data).forEach(([key, val]) => {
    if (val !== undefined) {
      fdata.append(key, val)
    }
  })
  return axiosClient.post<CommonResponse<IEmployee>>('/employee', fdata)
}

export function deleteEmployee(id: number) {
  return axiosClient.delete<CommonResponse<IEmployee>>('/employee/' + id)
}

export async function getEmployeeById(id: number) {
  const data = await axiosClient
    .get<CommonResponse<IEmployee>>('/employee/' + id)
    .then((res) => res.data.data)
  return data
}

export async function getEmployeeAll(resId: number) {
  const data = await axiosClient
    .get<CommonResponse<IEmployee>>(
      `/employee?page=1&size=999&restaurant_id=${resId}`
    )
    .then((res) => res.data.data)
  return data
}
