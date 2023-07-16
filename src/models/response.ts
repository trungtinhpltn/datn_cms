export interface CommonResponse<T> {
  status: 'success' | 'error'
  statusCode: number
  message: string
  data: T
}

export interface IAuth {
  token: string
  refreshToken: string
}

export interface IDecoded {
  userId: string
  email: string
  iat: number
  exp: number
  role?: string
}

export type IRefreshAccessTokenResponseData = IAuth

export interface IUser {
  email: string
  role: string
  phoneNumber: string
  avatar: string
  active: boolean
  createdAt: string
  lastLogin: string
}

export type ISignInResponseData = IAuth

export interface ISignOutResponseData extends CommonResponse {
  data: boolean
}

export type IGetProfilesResponseData = IUser

export type IForgetPasswordResponseData = CommonResponse
