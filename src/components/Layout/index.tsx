import classNames from 'classnames'
import LoadingScreen from 'components/Loading/LoadingScreen'
import { useAuth } from 'contexts/auth'
import { useTabPaneContext } from 'contexts/tabPane'
import { useDefaultActiveMenu } from 'hooks/useDefaultActiveMenu'
import { Navigate, useLocation, useOutlet } from 'react-router-dom'

import MobileMenu from './MobileMenu'
import SideMenu from './SideMenu'
import TabPane from './TabPane'
import TopBar from './TopBar'

export type ILayoutProps = React.PropsWithChildren
const pathEmp = [`/ca-lam-viec`, `/thong-tin-ca-nhan`, '/doi-mat-khau']

export default function Layout(props: ILayoutProps) {
  // const { children } = props
  const redirectLink = localStorage.getItem('redirectLink')
  const { user, isLoading, isAuthenticated } = useAuth()
  const location = useLocation()
  const { listTabPane } = useTabPaneContext()
  const outlet = useOutlet()

  useDefaultActiveMenu()

  if (typeof isAuthenticated === 'undefined') {
    return <LoadingScreen show={isLoading} />
  }

  if (!isAuthenticated && typeof isAuthenticated === 'boolean') {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    const currentLink = `${location.pathname}${location.search}`
    localStorage.setItem('redirectLink', currentLink)
    return <Navigate to={`/login`} state={{ from: location }} replace />
  }

  if (redirectLink) {
    localStorage.removeItem('redirectLink')
    return <Navigate to={redirectLink} state={{ from: location }} replace />
  }

  // if (!isAuthenticated && typeof isAuthenticated === 'undefined') {
  //   return <LoadingScreen show={isLoading} />
  // }
  if (
    user &&
    user.role === 'EMPLOYEE' &&
    !pathEmp.includes(location.pathname)
  ) {
    return (
      <Navigate to={'/thong-tin-ca-nhan'} state={{ from: location }} replace />
    )
  }

  return (
    <>
      <MobileMenu />
      <TopBar />
      {/* <TabManage /> */}
      <div
        className={classNames('wrapper', listTabPane.length && 'before:mt-0')}
      >
        <TabPane />
        <div className="wrapper-box">
          <SideMenu />
          <div className="content">{outlet}</div>
        </div>
      </div>
      {/* <DarkModeSwitcher /> */}
    </>
  )
}
