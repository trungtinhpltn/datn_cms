import type { ServiceBoughtDTO } from 'api/interfaces'
import type { IManagermentRestaurant } from 'models/restaurant'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { getRestaurantAll } from 'services/restaurant.service'

export interface IGlobalCtxProp {
  restaurantSelect?: ServiceBoughtDTO
  setRestaurantSelect: (s: ServiceBoughtDTO) => void
  restaurants?: IManagermentRestaurant[]
  initRestaurant: () => void
}

export const defaultValueGlobalCtx = {
  restaurants: [],
  setRestaurantSelect: () => {
    throw new Error('method not implimented')
  },
  initRestaurant: () => {
    throw new Error('method not implimented')
  },
  restaurantSelect: {}
}

export const GlobalCtx = createContext<IGlobalCtxProp>(defaultValueGlobalCtx)
export const useGlobalContext = () => useContext(GlobalCtx)

export const GlobalProvider = ({ children }: React.PropsWithChildren) => {
  const [restaurantSelect, setRestaurantSelect] =
    useState<IManagermentRestaurant>()
  const [restaurants, setRestaurants] = useState([])

  const initRestaurant = useCallback(() => {
    getRestaurantAll().then((data) => {
      data = data?.data
      const restaurantId = localStorage.getItem('restaurant_id')
      if (!restaurantId) {
        return setRestaurantSelect(data?.[0])
      }
      const storageActiveService = data.find(
        (res: IManagermentRestaurant) => res?.id === +restaurantId
      )
      if (!storageActiveService) {
        return setRestaurantSelect(data?.[0])
      }
      setRestaurantSelect(storageActiveService)
      setRestaurants(data)
    })
  }, [])

  useEffect(() => {
    initRestaurant()
  }, [initRestaurant])

  useEffect(() => {
    if (restaurantSelect?.id) {
      localStorage.setItem('restaurant_id', String(restaurantSelect?.id))
    }
  }, [restaurantSelect?.id])

  return (
    <GlobalCtx.Provider
      value={{
        restaurants,
        restaurantSelect,
        setRestaurantSelect,
        initRestaurant
      }}
    >
      {children}
    </GlobalCtx.Provider>
  )
}
