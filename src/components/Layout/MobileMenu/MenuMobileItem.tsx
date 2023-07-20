import type { IMenuItem } from 'common/menu.type'
import { useAuth } from 'contexts/auth'
import useMenuContext from 'contexts/menu'
import { ChevronDown } from 'lucide-react'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'

export interface IMenuItemProps {
  item?: IMenuItem
}

export default function MenuItem(props: IMenuItemProps) {
  const { item } = props
  const navigate = useNavigate()
  const { activeMenu, setActiveMenu } = useMenuContext()
  const { user } = useAuth()
  const [open, setOpen] = React.useState(!!item?.options?.open)
  const toggle = () => setOpen(!open)

  const hasPermissionsMenu = (menuItem?: IMenuItem): boolean => {
    if (!user?.role) return false
    return menuItem?.role?.includes(user?.role) || false
  }

  const onClickMenuItem = () => {
    if (item?.onClick || item?.url) {
      setActiveMenu(item)
      if (item?.onClick) {
        return item.onClick()
      }
      if (item?.url) {
        return navigate(item.url)
      }
    }
    return toggle()
  }

  if (item?.hiddenOnMenu || !hasPermissionsMenu(item)) {
    return <></>
  }

  return (
    <li>
      <a
        href={item?.url}
        onClick={onClickMenuItem}
        className={`menu cursor-pointer ${
          activeMenu?.id === item?.id ? 'menu--active' : ''
        }`}
      >
        <div className="menu__icon">{item?.iconName}</div>
        <div className="menu__title">
          {item?.name}
          {!!item?.children?.length && (
            <ChevronDown
              className={`menu__sub-icon ${open ? 'rotate-180' : ''}`}
            />
          )}
        </div>
      </a>
      <ul className={`${open ? 'menu__sub-open' : ''}`}>
        {item?.children?.map((subItem) => (
          <MenuItem key={subItem.id} item={subItem} />
        ))}
      </ul>
    </li>
  )
}
