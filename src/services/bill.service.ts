import type { IBill, IBillItem } from 'models/bill'
import * as qs from 'qs'

import axiosClient from './axiosClient'

export async function createBill(data: IBill): Promise<any> {
  const response = await axiosClient.post('/bill', data)
  return response.data
}

export async function getBillById(id: number): Promise<any> {
  const response = await axiosClient.get(`/bill/getById/${id}`)
  return response.data.data
}

export async function getReport(data: any): Promise<any> {
  const query = qs.stringify(data)
  const response = await axiosClient.get(`/bill/getReport?${query}`)
  return response.data.data
}

export async function deleteBill(id: number): Promise<any> {
  const response = await axiosClient.delete(`/bill/${id}`)
  return response.data
}

export async function updateBill(id: number, data: any): Promise<any> {
  const response = await axiosClient.put(`/bill/${id}`, data)
  return response.data
}

export async function createBillItem(data: IBillItem): Promise<any> {
  const response = await axiosClient.post('/bill-item', data)
  return response.data
}

export async function updateBillItem(data: IBillItem): Promise<any> {
  const response = await axiosClient.put(`/bill-item/${data?.id}`, data)
  return response.data
}

export async function deleteBillItem(id: number): Promise<any> {
  const response = await axiosClient.delete(`/bill-item/${id}`)
  return response.data
}

export async function getCustomerByPhone(phone: string): Promise<any> {
  const response = await axiosClient.get(`/customer?phone=${phone}`)
  return response.data
}
