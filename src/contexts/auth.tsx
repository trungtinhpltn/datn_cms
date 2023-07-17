/* eslint-disable react-hooks/exhaustive-deps */
import type { IDecoded, IUser } from 'common/auth'
import LoadingScreen from 'components/Loading/LoadingScreen'
import type { SignInParams } from 'contants/auth'
import useLocalStorage from 'hooks/useLocalStorage'
import jwt_decode from 'jwt-decode'
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import authenticationAPI from 'services/authentication.service'
import { toastError, toastSuccess } from 'utils/toast'

interface IAuthContextProps {
  isLoading: boolean
  isAuthenticated?: boolean
  user?: IUser | null
  signOut: () => void
  signIn: (params: SignInParams) => void
  setUser: Dispatch<SetStateAction<IUser | null | undefined>>
  openLoginPopup: () => void
  requireLogin: (cb: () => void) => any
  getUser: () => void
}

export const AUTH_CONTEXT_KEYS = {
  afterLoginUrl: 'AUTH_CONTEXT_KEYS:afterLoginUrl',
  afterLogoutUrl: 'AUTH_CONTEXT_KEYS:afterLogoutUrl',
  accessToken: 'AUTH_CONTEXT_KEYS:accessToken',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  USER: 'USER'
}

const AuthContext = createContext<IAuthContextProps>({
  signOut: function (): void {
    throw new Error('Function not implemented.')
  },
  signIn: function (): void {
    throw new Error('Function not implemented.')
  },
  setUser: function (): void {
    throw new Error('Function not implemented.')
  },
  isLoading: true,
  openLoginPopup: function (): void {
    throw new Error('Function not implemented.')
  },
  requireLogin: function (): void {
    throw new Error('Function not implemented.')
  },
  getUser: () => {
    throw new Error('Function not implemented.')
  }
})

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }: PropsWithChildren<any>) {
  const [user, setUser] = useState<IUser | null>()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>()
  const [isLoading, setLoading] = useState(true)
  const [showLoginPopup, setShowLoginPopup] = useState<boolean>(false)
  const [userStorageValue, setUserStorageValue] = useLocalStorage<IUser>('USER')

  // useEffect(() => {
  //   if (!user) {
  //     return
  //   }

  //   const oneMinute = 60 * 1000
  //   const time = user.expiresTime - new Date().getTime() - oneMinute

  //   const timeout = setTimeout(
  //     async () => {
  //       if (!user.refresh_token) {
  //         return
  //       }
  //       const response = await refreshAccessToken(user.refresh_token)
  //       const { access_token, refresh_token, expiresTime } = response.data || {}

  //       setUser({
  //         ...user,
  //         access_token: access_token,
  //         refresh_token: refresh_token,
  //         expiresTime: expiresTime * 1000
  //       })
  //       return () => clearTimeout(timeout)
  //     },
  //     time < 0 ? 0 : time
  //   )

  //   return () => clearTimeout(timeout)
  // }, [user?.expiresTime])

  const getUser = useCallback(async () => {
    if (!userStorageValue || !userStorageValue.token) {
      setUser(null)
      setLoading(false)
      setIsAuthenticated(false)
      return
    }
    try {
      let dataProfile: any = await authenticationAPI.getCurrentUser()
      dataProfile = dataProfile?.data?.data
      if (dataProfile) {
        setUser({
          ...dataProfile,
          token: userStorageValue.token || '',
          refreshToken: userStorageValue.refreshToken || '',
          expiredTime: userStorageValue.expiredTime || 0
        })
        setIsAuthenticated(true)
        setLoading(false)
      } else {
        setUser(null)
        setLoading(false)
        setIsAuthenticated(false)
      }
    } catch (err) {
      setUser(null)
      setLoading(false)
      setIsAuthenticated(false)
    }
  }, [userStorageValue])

  const onInit = async () => {
    setLoading(true)
    if (!userStorageValue || !userStorageValue.token) {
      setUser(null)
      setLoading(false)
      setIsAuthenticated(false)
      return
    }
    try {
      let dataProfile: any = await authenticationAPI.getCurrentUser()
      dataProfile = dataProfile?.data?.data
      if (dataProfile) {
        setUser({
          ...dataProfile,
          token: userStorageValue.token || '',
          refreshToken: userStorageValue.refreshToken || '',
          expiredTime: userStorageValue.expiredTime || 0
        })
        setIsAuthenticated(true)
        setLoading(false)
      } else {
        setUser(null)
        setLoading(false)
        setIsAuthenticated(false)
      }
    } catch (err) {
      setUser(null)
      setLoading(false)
      setIsAuthenticated(false)
    }
  }

  const signOut = async () => {
    try {
      await authenticationAPI.signOut()
      setTimeout(() => localStorage.removeItem('redirectLink'), 1000)
      localStorage.removeItem(AUTH_CONTEXT_KEYS.USER)
      setIsAuthenticated(false)
    } catch (error: any) {
      toastError(error.message || 'Đã có lỗi xảy ra')
    }
  }

  const signIn = async (params: SignInParams) => {
    setLoading(true)
    try {
      let response: any = await authenticationAPI.signIn(params)
      response = response?.data?.data
      const { tokens } = response
      if (!tokens?.access_token || !tokens.refresh_token) {
        return toastError('Đăng nhập thất bại')
      }
      const decoded: IDecoded = jwt_decode(tokens.access_token)
      const user: IUser = {
        id: decoded.id,
        email: decoded.email,
        token: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiredTime: decoded.exp,
        employeeId: decoded.employeeId
      }
      setUser(user)
      setIsAuthenticated(true)
      setUserStorageValue(user)
      toastSuccess('Đăng nhập thành công')
    } catch (error: any) {
      console.log(error)
      toastError(error.message || 'Đã có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }

  const openLoginPopup = () => {
    setShowLoginPopup(true)
  }

  const requireLogin = (callback: () => void) => {
    return () => (isAuthenticated ? callback() : openLoginPopup())
  }

  useEffect(() => {
    onInit()
  }, [userStorageValue])

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      isLoading,
      setUser,
      signOut,
      signIn,
      openLoginPopup,
      requireLogin,
      getUser
    }),
    [isAuthenticated, user, isLoading, getUser]
  )
  return (
    <AuthContext.Provider value={value}>
      {children}
      <LoadingScreen show={isLoading} />
    </AuthContext.Provider>
  )
}
