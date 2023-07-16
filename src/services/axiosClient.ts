import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { AUTH_CONTEXT_KEYS } from 'contexts/auth'

axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'

function getAccessToken() {
  const userValues = localStorage.getItem(AUTH_CONTEXT_KEYS.USER)
  const user: any = userValues ? JSON.parse(userValues) : {}
  return user.token
}
function getRefeshToken() {
  const userValues = localStorage.getItem(AUTH_CONTEXT_KEYS.USER)
  const user: any = userValues ? JSON.parse(userValues) : {}
  return user.refreshToken
}
function setAccessToken(token: string) {
  const userValues = localStorage.getItem(AUTH_CONTEXT_KEYS.USER)
  const user: any = userValues ? JSON.parse(userValues) : {}
  user.token = token
  localStorage.setItem(AUTH_CONTEXT_KEYS.USER, JSON.stringify(user))
}
function clearAuth() {
  localStorage.removeItem(AUTH_CONTEXT_KEYS.USER)
}

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const customHeaders: Record<string, string> = {}
    const token = getAccessToken()
    if (token) {
      customHeaders['Authorization'] = `Bearer ${token}`
    }
    return { ...config, headers: { ...customHeaders } }
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
      return axios
        .post('/auth/refresh-token', {
          refreshToken: getRefeshToken()
        })
        .then((res) => {
          // console.log('res', res.status, res.data);
          if (res.status === 201 || res.status === 200) {
            // 1) put token to LocalStorage
            const { token } = res.data
            setAccessToken(token)

            // 2) Change Authorization header
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

            // 3) return originalRequest object with Axios.
            return axios(originalRequest)
          }
          throw new Error("Can't refesh token.")
        })
        .catch((err) => {
          clearAuth()
          location.replace('/login')
          console.error('err', err)
        })
    } else {
      throw new Error(error.response.data.message)
    }
  }
)

export default axios
