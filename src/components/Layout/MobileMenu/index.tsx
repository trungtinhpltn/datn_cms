import useMenuContext from 'contexts/menu'
import { BarChart2, XCircle } from 'lucide-react'
import { useState } from 'react'
import logo from 'src/assets/images/logo.svg'

import MenuItem from './MenuMobileItem'

export interface IMobileMenuProps {}

export default function MobileMenu(props: IMobileMenuProps) {
  const { menuList } = useMenuContext()
  const [open, setOpen] = useState(false)
  return (
    <div className={`mobile-menu md:hidden ${open && 'mobile-menu--active'}`}>
      <div className="mobile-menu-bar">
        <a className="mr-auto flex">
          <img alt="Midone - HTML Admin Template" className="w-6" src={logo} />
        </a>
        <a
          onClick={() => setOpen(true)}
          className="mobile-menu-toggler cursor-pointer"
        >
          <BarChart2 className="h-8 w-8 -rotate-90 text-white" />
        </a>
      </div>
      <div className="scrollable">
        <a className="mobile-menu-toggler show cursor-pointer">
          <XCircle
            onClick={() => setOpen(false)}
            className="h-8 w-8 -rotate-90 text-white"
          />
        </a>
        <ul className="scrollable__content py-2">
          {menuList?.length &&
            menuList.map((item) => <MenuItem key={item.id} item={item} />)}
        </ul>
      </div>
    </div>
  )
}
