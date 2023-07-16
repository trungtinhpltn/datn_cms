import axios from 'axios'

export async function postAuthForgotPassword(payload: {
  email?: string
}): Promise<PostAuthForgotPasswordResponse> {
  const { email } = payload
  const { data } = await axios({
    url: '/auth/forgot-password',
    method: 'POST',
    data: { email }
  })
  return data
}

export async function postAuthLoginWithApiKey(payload: {
  apiKey?: string
}): Promise<PostAuthLoginWithApiKeyResponse> {
  const { apiKey } = payload
  const { data } = await axios({
    url: '/auth/login-with-api-key',
    method: 'POST',
    data: { apiKey }
  })
  return data
}

export async function getAuthLogOut(): Promise<GetAuthLogOutResponse> {
  const { data } = await axios({
    url: '/auth/log-out',
    method: 'GET'
  })
  return data
}

export async function postAuthLogin(payload: {
  email: string
  password: string
}): Promise<PostAuthLoginResponse> {
  const { email, password } = payload
  const { data } = await axios({
    url: '/auth/login',
    method: 'POST',
    data: { email, password }
  })
  return data
}

export async function postAuthRefreshToken(payload: {
  refreshToken: string
}): Promise<PostAuthRefreshTokenResponse> {
  const { refreshToken } = payload
  const { data } = await axios({
    url: '/auth/refresh-token',
    method: 'POST',
    data: { refreshToken }
  })
  return data
}
