import type { IListViewQuery } from 'components/ListView'
import { useGlobalContext } from 'contexts/global'
import useQueryParam from 'hooks/useQueryParams'
import { useEffect } from 'react'

export default function Home() {
  const { restaurantSelect } = useGlobalContext()
  const [queryParams, setQueryParams] = useQueryParam<IListViewQuery>()
  useEffect(() => {
    if (queryParams && queryParams.restaurant_id) return
    if (restaurantSelect?.id) {
      setQueryParams((queryParams) => ({
        ...queryParams,
        restaurant_id: restaurantSelect?.id
      }))
    }
  }, [restaurantSelect, setQueryParams, queryParams])
  return <div>Trang chu</div>
}
