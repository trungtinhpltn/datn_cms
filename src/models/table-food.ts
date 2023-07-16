import type { IOrder } from './order'

export interface ITableFood {
  id?: number
  name: string
  description: string
  prePaymentAmount?: number
  restaurantId?: number
  status?: TableFoodStatus
  orderId?: number
  OrderNext?: IOrder
  BillTableOrder?: {
    billId: number
  }
}

export enum TableFoodStatus {
  FREE = 'FREE',
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE'
}

export const tableFoodStatusToText = {
  FREE: 'Trống',
  PENDING: 'Đã được đặt',
  ACTIVE: 'Đang sử dụng'
}

export const tableStatus = [
  {
    label: 'Trống',
    value: 'FREE'
  },
  {
    label: 'Đang sử dụng',
    value: 'ACTIVE'
  },
  {
    label: 'Đã được đặt',
    value: 'PENDING'
  }
]
