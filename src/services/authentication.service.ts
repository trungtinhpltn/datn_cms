import type { SignInParams } from 'contants/auth'

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
  async changePassword(id: number, data: any) {
    const response = await axiosClient.post<any>(
      `/users/changePassword/${id}`,
      data
    )
    return response.data
  }
}

export default authenticationAPI
