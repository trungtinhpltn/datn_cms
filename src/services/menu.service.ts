import type { ICategory, IMenuItem, IUnit } from 'models/menu'

import axiosClient from './axiosClient'

export async function createCategory(data: ICategory): Promise<ICategory> {
  const response = await axiosClient.post('/menu-category', data)
  return response.data
}

export async function getCategoryById(id: number): Promise<any> {
  const response = await axiosClient.get('/menu-category/' + id)
  return response.data
}

export async function getAllCategory(): Promise<any> {
  const response = await axiosClient.get('/menu-category/all')
  return response.data
}

export async function editCategory(data: ICategory): Promise<ICategory> {
  const response = await axiosClient.put(`/menu-category/${data?.id}`, data)
  return response.data
}

export async function createUnit(data: IUnit): Promise<IUnit> {
  const response = await axiosClient.post('/menu-unit', data)
  return response.data
}

export async function getUnitById(id: number): Promise<any> {
  const response = await axiosClient.get('/menu-unit/' + id)
  return response.data
}

export async function getAllUnit(): Promise<any> {
  const response = await axiosClient.get('/menu-unit/all')
  return response.data
}

export async function editUnit(data: IUnit): Promise<IUnit> {
  const response = await axiosClient.put(`/menu-unit/${data?.id}`, data)
  return response.data
}

export async function createMenuItem(data: IMenuItem): Promise<IMenuItem> {
  const response = await axiosClient.post('/menu-item', data)
  return response.data
}

export async function getMenuItemById(id: number, query: string): Promise<any> {
  const response = await axiosClient.get(`/menu-item/${id}?${query}`)
  return response.data
}

export async function getAllByRestaurant(id: number): Promise<any> {
  const response = await axiosClient.get(`/menu-item/findAllByRestaurant/${id}`)
  return response.data.data
}

export async function editMenuItemBy(
  id: number,
  data: IMenuItem
): Promise<IMenuItem> {
  const response = await axiosClient.put(`/menu-item/${id}`, data)
  return response.data
}

export async function deleteMenuitemByid(id: number): Promise<any> {
  const response = await axiosClient.delete(`/menu-item/${id}`)
  return response.data
}

export async function deleteMenuCategoryByid(id: number): Promise<any> {
  const response = await axiosClient.delete(`/menu-category/${id}`)
  return response.data
}

export async function deleteMenuUnitByid(id: number): Promise<any> {
  const response = await axiosClient.delete(`/menu-unit/${id}`)
  return response.data
}
