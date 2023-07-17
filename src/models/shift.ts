export interface IHisShift {
  id?: number | null
  employeeId?: number
  restaurantId?: number
  startDate: string
  endDate: string
  year: number
  monday: number[]
  tuesday: number[]
  wednesday: number[]
  thursday: number[]
  friday: number[]
  saturday: number[]
  sunday: number[]
  msg?: string
  updatedAt?: string
  exits?: boolean
  Employee: {
    name: string
  }
}
