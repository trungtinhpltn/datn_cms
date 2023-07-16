import type { IMenuItem } from './menu'

export interface IBill {
  tableId: number
  customer?: ICustomer | null
  restaurantId: number
}

export interface ICustomer {
  name: string
  phone: string
}

export interface IBillItem {
  id?: number
  billId?: number
  itemId?: number
  quantity?: number
  MenuItem?: IMenuItem
}

export enum IBillStatus {
  PENDING = 'PENDING',
  CONFIRM = 'CONFIRM'
}

export const billStatusOptions = [
  {
    label: 'Chờ thanh toán',
    value: 'PENDING'
  },
  {
    label: 'Đã thanh toán',
    value: 'CONFIRM'
  }
]

export interface IBillInfo {
  id: number
  createdAt: string
  customerId: number
  customerPay: number
  paymentMethod: string
  discount: number
  exportTime: string
  giveBack: number
  paymentPrice: number
  totalPrice: number
  status: IBillStatus
  Customer?: {
    id: number
    name: string
    phone: string
  }
  billItems: IBillItem[]
  billTableOrder?: {
    tableId: number
  }
}
