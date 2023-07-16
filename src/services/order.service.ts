import type { IOrder } from 'models/order'

import axiosClient from './axiosClient'

export async function getOrderByid(id: number): Promise<any> {
  const response = await axiosClient.get(`/order/getById/${id}`)
  return response.data.data
}

export async function cancelOrderByid(id: number, msg: string): Promise<any> {
  const response = await axiosClient.delete(
    `/order/cancelOrder/${id}?msg=${msg}`
  )
  return response.data.data
}

export async function getTableOrder(
  id: number,
  restaurantId: number
): Promise<any> {
  const response = await axiosClient.get(
    `/order/getTableOrder/${id}?restaurantId=${restaurantId}`
  )
  return response.data.data
}

export async function updateSelectTableOrder({
  id,
  data
}: {
  id: number
  data: IOrder
}): Promise<any> {
  const response = await axiosClient.put(`/order/updateSelectTable/${id}`, data)
  return response.data.data
}
