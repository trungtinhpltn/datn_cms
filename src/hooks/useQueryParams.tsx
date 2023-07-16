import { isEqual } from 'lodash'
import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { convertUrlSearchParamsToObject } from 'utils'

export default function useQueryParam<T>(): [
  T | undefined,
  Dispatch<SetStateAction<T>>
] {
  const [searchParams, setSearchParams] = useSearchParams()
  const [queryParams, setQueryParams] = useState<T>(
    convertUrlSearchParamsToObject(searchParams)
  )

  useEffect(() => {
    const toQueryParams = convertUrlSearchParamsToObject<T>(searchParams)
    searchParams && setQueryParams(toQueryParams)
  }, [searchParams])

  useEffect(() => {
    const toQueryParams = convertUrlSearchParamsToObject<T>(searchParams)
    if (isEqual(queryParams, toQueryParams)) {
      return
    }
    queryParams && setSearchParams(queryParams, { replace: true })
  }, [queryParams])

  return [queryParams, setQueryParams]
}

// export default function useQueryParam<T>(
//   key: string
// ): [T | undefined, (newQuery: T, options?: NavigateOptions) => void] {
//   let [searchParams, setSearchParams] = useSearchParams()
//   let paramValue = searchParams.get(key)

//   let value = useMemo(() => JSURL.parse(paramValue), [paramValue])

//   let setValue = useCallback(
//     (newValue: T, options?: NavigateOptions) => {
//       setSearchParams((oldValue) => {
//         const oldJsValue = JSURL.parse(oldValue.get(key))
//         const newSearchParams = new URLSearchParams()

//         console.log({
//           oldJsValue,
//           newValue
//         })

//         newSearchParams.set(
//           key,
//           JSURL.stringify({ ...oldJsValue, ...newValue })
//         )
//         return newSearchParams
//       }, options)
//     },
//     [key, value, searchParams, setSearchParams]
//   )

//   return [value, setValue]
// }
