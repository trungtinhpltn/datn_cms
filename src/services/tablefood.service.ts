import type { ITableFood } from './../models/table-food'
import axiosClient from './axiosClient'

export async function createTableFood(data: ITableFood): Promise<ITableFood> {
  const response = await axiosClient.post('/table-food', data)
  return response.data
}

export async function getTableFoodByQuery(query: string): Promise<ITableFood> {
  const response = await axiosClient.get(
    `/table-food${query ? `?${query}` : ``}`
  )
  return response.data
}

export async function getTableFoodById(id: number): Promise<ITableFood> {
  const response = await axiosClient.get(`/table-food/${id}`)
  return response.data
}

export async function editTableFood({
  id,
  data
}: {
  id: number
  data: ITableFood
}): Promise<any> {
  const response = await axiosClient.put(`/table-food/${id}`, data)
  return response.data
}

export async function deleteTableFood(id: number): Promise<any> {
  const response = await axiosClient.delete(`/table-food/${id}`)
  return response.data
}
