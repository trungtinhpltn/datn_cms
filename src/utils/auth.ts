import type { Inputs } from 'pages/login'

export const auth = 1

export function cleanLoginData<T extends Partial<Inputs>>(modifiedData: T) {
  const data: T = { ...modifiedData }
  // clean data
  if (modifiedData.email) {
    data.email = modifiedData.email.replace(/\s+/g, ' ').trim()
  }
  if (modifiedData.password) {
    data.password = modifiedData.password.replace(/\s+/g, ' ').trim()
  }
  return data
}
