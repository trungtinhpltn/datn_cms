import type { SignInParams } from 'contants/auth'
import type * as modelsResponse from 'models/response'

import axiosClient from './axiosClient'

const authenticationAPI = {
  signIn(params: SignInParams) {
    return axiosClient.post<any>('/auth/signIn', params)
  },
  signOut() {
    return axiosClient.post('/auth/signOut')
  },
  getCurrentUser() {
    return axiosClient.get<any>('/users/me')
  },
  forgetPassword(email: string) {
    return axiosClient.post<modelsResponse.IForgetPasswordResponseData>(
      '/users/forgetPassword',
      { email }
    )
  }
}

export default authenticationAPI
