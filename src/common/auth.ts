export interface IDecoded {
  email: string
  employeeId: number
  exp: number
  iat: number
  id: number
  username: string
}

export interface IUser {
  email: string
  employeeId?: number
  id?: number
  token?: string
  refreshToken?: string
  expiredTime?: number
  active?: boolean
  name?: string
  hashedRt?: string
  role?: string
  Employee?: {
    image: string
    position: string
    id: number
    restaurantId: number
  }
}
