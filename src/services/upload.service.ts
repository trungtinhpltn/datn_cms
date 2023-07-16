import axios from 'axios'
import { baseUrl } from 'common/config'

export async function uploadFile(data: any): Promise<any> {
  const response = await axios({
    baseURL: baseUrl,
    method: 'post',
    url: '/upload',
    data: data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data
}
