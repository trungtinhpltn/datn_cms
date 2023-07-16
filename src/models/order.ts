export const ActiveOptions = [
  { value: 'active', label: 'Đã xác nhận' },
  { value: 'inactive', label: 'Chưa xác nhận' }
]

export interface IOrder {
  id?: number
  name: string
  phone: string
  email: string
  date: string
  time: string
  person: number
  children: number
  key?: string
  restaurantId: number
  tableId?: number
  Restaurant?: any
}
