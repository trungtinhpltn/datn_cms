import AccountMenu from '../AccountMenu'
import Breadcrumb from '../Breadcrumb'
import ChoiceRestaurant from '../ChoiceRestaurant'
import Logo from '../Logo'

// import SeachBar from '../Search'

export default function TopBar() {
  return (
    <div className="top-bar-boxed relative z-[51] -mx-3 my-12 h-[70px] border-b border-white/[0.08] px-3 sm:-mx-8 sm:px-8 md:-mt-5 md:pt-0">
      <div className="flex h-full items-center">
        <Logo />
        <Breadcrumb />
        {/* <SeachBar /> */}
        <ChoiceRestaurant />
        {/* <Notifications /> */}
        <AccountMenu />
      </div>
    </div>
  )
}
