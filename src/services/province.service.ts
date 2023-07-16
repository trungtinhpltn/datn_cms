import axiosClient from './axiosClient'

export const provinceAPI = {
  getAll() {
    return axiosClient.get<any>('/province')
  },
  getByType(type: string) {
    return axiosClient.get<any>(`/province/findByType?type=${type}`)
  }
}
