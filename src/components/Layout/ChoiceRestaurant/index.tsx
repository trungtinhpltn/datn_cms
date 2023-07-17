import Select from 'components/Select'
import { useAuth } from 'contexts/auth'
import { useGlobalContext } from 'contexts/global'
import useMenuContext from 'contexts/menu'
import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router'

export default function ChoiceRestaurant() {
  const { restaurants, restaurantSelect, setRestaurantSelect } =
    useGlobalContext()
  const { setActiveMenu } = useMenuContext()
  const { user } = useAuth()
  const options = useMemo<{ value: number; label: string }[]>(
    () =>
      restaurants?.map((r) => ({
        value: Number(r.id),
        label: String(r.name)
      })) || [],
    [restaurants]
  )
  const navigate = useNavigate()

  const selectedOption = useMemo(
    () =>
      restaurantSelect
        ? {
            label: String(restaurantSelect?.name),
            value: Number(restaurantSelect?.id)
          }
        : undefined,
    [restaurantSelect]
  )

  useEffect(() => {
    if (!user) return
    if (user.role === 'ADMIN') return
    const find = restaurants?.find(
      (item) => item?.id === user.Employee?.restaurantId
    )
    find && setRestaurantSelect(find)
  }, [user, restaurants, setRestaurantSelect])

  return (
    <>
      <Select<any>
        className="user-status-select mr-4 min-w-[250px] cursor-pointer border-none text-lg"
        placeholder="Chọn nhà hàng "
        options={options}
        value={selectedOption}
        isDisabled={user?.role !== 'ADMIN'}
        handleFunc={(choice) => {
          const tmp = restaurants?.find((r) => r.id === choice.value)
          if (tmp) {
            setRestaurantSelect(tmp)
            navigate('/', { replace: true })
            setActiveMenu({
              id: 'home',
              name: 'Trang chủ',
              url: '/',
              iconName: 'Zap',
              children: []
            })
          }
        }}
      />
    </>
  )
}
