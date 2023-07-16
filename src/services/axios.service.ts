import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { baseUrl } from 'common/config'
import { getItem } from 'hooks/useCookie'

axios.defaults.baseURL = baseUrl

axios.defaults.headers.post['Content-Type'] = 'application/json'

function getAccessToken() {
  return getItem('access-token')
}
// function getRefeshToken() {
//   return getItem('refresh-token')
// }
// function setAccessToken(token: string) {
//   console.log(token)
// }
// function clearAuth() {
//   localStorage.removeItem(AUTH_CONTEXT_KEYS.USER)
// }

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const customHeaders: Record<string, string> = {}
    const token = getAccessToken()
    if (token && config?.headers?.Authorization !== 'no-auth') {
      customHeaders['Authorization'] = `Bearer ${token}`
    }
    return { ...config, headers: { ...config?.headers, ...customHeaders } }
  },
  function (error) {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true
      // await wait(1000)
      return axios(originalRequest)
      // location.replace('/login')
      // return axios
      //   .post('/auth/refresh-token', {
      //     refreshToken: getRefeshToken()
      //   })
      //   .then((res) => {
      //     // console.log('res', res.status, res.data);
      //     if (res.status === 201 || res.status === 200) {
      //       // 1) put token to LocalStorage
      //       const { token } = res.data
      //       setAccessToken(token)

      //       // 2) Change Authorization header
      //       axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

      //       // 3) return originalRequest object with Axios.
      //       return axios(originalRequest)
      //     }
      //     throw new Error("Can't refesh token.")
      //   })
      //   .catch((err) => {
      //     clearAuth()
      //     location.replace('/login')
      //     console.error('err', err)
      //   })
    } else {
      return Promise.reject(error)
    }
  }
)

export default axios
