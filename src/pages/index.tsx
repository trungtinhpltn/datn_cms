import AdminView from 'components/HomePage/AdminView'
import ManagerView from 'components/HomePage/ManagerView'
import type { IListViewQuery } from 'components/ListView'
import { useAuth } from 'contexts/auth'
import { useGlobalContext } from 'contexts/global'
import useQueryParam from 'hooks/useQueryParams'
import { useEffect } from 'react'

export default function Home() {
  const { restaurantSelect } = useGlobalContext()
  const { user } = useAuth()
  const [queryParams, setQueryParams] = useQueryParam<IListViewQuery>()
  useEffect(() => {
    if (queryParams && queryParams.restaurant_id) return
    if (!user) return
    if (!user.role) return
    if (user.role === 'ADMIN') return
    if (restaurantSelect?.id) {
      setQueryParams((queryParams) => ({
        ...queryParams,
        restaurant_id: restaurantSelect?.id
      }))
    }
  }, [restaurantSelect, setQueryParams, queryParams, user])

  if (!user?.role) {
    return <></>
  }

  return (
    <>
      {user?.role === 'ADMIN' && !queryParams?.restaurant_id ? (
        <AdminView />
      ) : (
        <ManagerView />
      )}
    </>
  )
}
