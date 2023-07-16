import { baseUrl } from 'common/config'

export function getApiUrl(path: string) {
  return baseUrl + path
}

export function fakeApiUrl(path: string) {
  console.log(path)
  return '/fakeApi.json'
}
