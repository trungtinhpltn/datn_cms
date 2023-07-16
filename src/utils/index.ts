import { baseUrlMedia } from 'common/config'
import type { TOption } from 'components/Input/InputSelect'
import type { QueryKey } from 'contants/query'
import { queryClient } from 'contexts/queryClient'
import { isEmpty, isString } from 'lodash'

export const formatCurecy = (
  price: string | number,
  { type, unit } = {
    type: '.',
    unit: 'đ'
  }
) => {
  return (
    (price || 0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${type}`) +
    ` ${unit}`
  )
}

export const convertUrlSearchParamsToObject = <T>(params: URLSearchParams) => {
  const result: Record<string, string[] | string> = {}
  for (const [key, value] of params.entries()) {
    if (Object.keys(result).includes(key)) {
      const oldValue = result[key]
      if (Array.isArray(oldValue)) {
        oldValue.push(value)
      } else {
        result[key] = [oldValue, value]
      }
    } else {
      result[key] = value
    }
  }
  return result as T
}

export const convertObjectToUrlSearchParams = (object: any) => {
  const searchParams = new URLSearchParams()
  for (const key of Object.keys(object)) {
    searchParams.append(key, object[key])
  }
  return searchParams
}

export const isSuccess = (status: string | undefined) => {
  return status === 'success'
}

export const isError = (status: string | undefined) => {
  return status !== 'success'
}

export const toSelectData = async <T extends Record<string, any>>(
  getData: () => Promise<T[]>,
  options: {
    fieldLabel?: keyof T
    fieldValue?: keyof T
    queryKey: [QueryKey, Record<string, any>]
  }
): Promise<TOption[]> => {
  const rawData = await queryClient.fetchQuery(options.queryKey, getData)
  return rawData.map((p) => ({
    label: p[options?.fieldLabel || 'name'].toString(),
    value: p[options?.fieldValue || 'id'].toString()
  }))
}

export const formatDate = (date: string) => {
  const dateString = new Date(date)
  const dates =
    dateString.getDate().toString().padStart(2, '0') +
    '/' +
    (dateString.getMonth() + 1).toString().padStart(2, '0') +
    '/' +
    dateString.getFullYear() +
    ' ' +
    dateString.getHours().toString().padStart(2, '0') +
    ':' +
    dateString.getMinutes().toString().padStart(2, '0')
  return dates
}

export const formatDateString = (date: string) => {
  const dateString = new Date(date)
  const dates =
    dateString.getDate().toString().padStart(2, '0') +
    '/' +
    (dateString.getMonth() + 1).toString().padStart(2, '0') +
    '/' +
    dateString.getFullYear()
  return dates
}

export const setEmptyOrStr = (v: unknown) => {
  if (isString(v) && isEmpty(v)) return undefined
  return v
}

export const getMedia = (url = '') => `${baseUrlMedia}/uploads/tmp/${url}`
export const getMedia2 = (url = '') => `${baseUrlMedia}/${url}`

export const replaceDistrict = (dist = '') =>
  dist.replace('Huyện', '').replace('Quận', '').replace('Thị xã', '')
export const replaceProvince = (pro = '') =>
  pro.replace('Thành phố', '').replace('Tỉnh', '')

export const replaceTime = (time = '') => time.replace('h', '')
