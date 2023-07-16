export interface IManagermentRestaurant {
  id?: number
  name?: string
  provinceId?: string
  addressDetail?: string
  districtId?: string
  active?: boolean
}

export interface ICreateRestaurant {
  id?: number
  name: string
  provinceId: number
  addressDetail: string
  districtId: number
}

export interface IEditRestaurant {
  name?: string
  provinceId?: number
  addressDetail?: string
  districtId?: number
  active?: boolean
}

export const ActiveOptions = [
  { value: 'true', label: 'Hoạt động' },
  { value: 'false', label: 'Không hoạt động' }
]
