export interface IEmployee {
  id: number
  name: string
  phone: string
  dateOfBirth: string
  placeOfBirth: string
  nation: string
  from: string
  idNumber: string
  learn: string
  address: string
  provinceId: string
  districtId: string
  image: string

  restaurantId: string
  restaurantName: string
  position: string
  active: string

  email: string
  password: string
  userId: number

  createdAt: Date | string

  type: string
  dateContract: Date | string
  wawe: number
  trialTime: number
}

export interface CreateEmployeeDto {
  email: string
  password: string
  name?: string
  phone?: string
  dateOfBirth?: Date
  placeOfBirth?: string
  nation?: string
  from?: string
  idNumber?: string
  learn?: string
  address?: string
  provinceId?: string
  districtId?: string
  restaurantId?: string
  Restaurant?: any
  position?: string
  active?: boolean
  type?: string
  dateContract?: Date
  wawe?: number
  trialTime?: number
  image?: any
}

export const positionOptions = [
  {
    label: 'Nhân viên',
    value: 'nhan_vien'
  },
  {
    label: 'Quản lý',
    value: 'quan_ly'
  }
]
