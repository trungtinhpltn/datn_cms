import type { ICreateRestaurant, IEditRestaurant } from './../models/restaurant'
import axiosClient from './axiosClient'

export async function createRestaurant(
  data: ICreateRestaurant
): Promise<ICreateRestaurant> {
  const response = await axiosClient.post('/restaurant', data)
  return response.data
}

export async function getRestaurantAll(): Promise<any> {
  const response = await axiosClient.get('/restaurant/all')
  return response.data
}

export async function getRestaurantByid(id: number): Promise<any> {
  const response = await axiosClient.get(`/restaurant/${id}`)
  return response.data
}

export async function deleteRestaurantByid(id: number): Promise<any> {
  const response = await axiosClient.delete(`/restaurant/${id}`)
  return response.data
}

export async function editRestaurant({
  id,
  data
}: {
  id: number
  data: IEditRestaurant
}): Promise<any> {
  const response = await axiosClient.put(`/restaurant/${id}`, data)
  return response.data
}
