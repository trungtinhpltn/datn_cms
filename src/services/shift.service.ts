import * as qs from 'qs'

import axiosClient from './axiosClient'

export async function getShiftByUserId(userId: number): Promise<any> {
  const response = await axiosClient.get(`/shift?user_id=${userId}`)
  return response.data.data
}

export async function createShiftByUserId(data: any): Promise<any> {
  const response = await axiosClient.post(`/shift`, data)
  return response.data.data
}

export async function getHisShiftByRestaurant(data: any): Promise<any> {
  const query = qs.stringify(data)
  const response = await axiosClient.get(
    `/shift/getHisShiftByRestaurant?${query}`
  )
  return response.data.data
}

export async function updateHisShift(id: number, data: any): Promise<any> {
  const response = await axiosClient.put(`/shift/updateHisShift/${+id}`, data)
  return response.data.data
}

export async function getHisShiftByEmployee(data: any): Promise<any> {
  const query = qs.stringify(data)
  const response = await axiosClient.get(
    `/shift/getHisShiftByEmployee?${query}`
  )
  return response.data.data
}
