import type { AuthorizationData } from 'models/authorization'

import axiosClient from './axiosClient'

const authorizeService = {
  async update(data: Array<AuthorizationData>) {
    const response = await axiosClient.put<Array<AuthorizationData>>(
      `https://63f590192213ed989c568328.mockapi.io/api/v1/authorize`,
      data
    )
    return response.data
  }
}
export default authorizeService
