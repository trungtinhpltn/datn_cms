import classNames from 'classnames'
import type { IMenuItem } from 'common/menu.type'
import Icon from 'components/Icon'
import { useAuth } from 'contexts/auth'
import useMenuContext from 'contexts/menu'
import { ChevronDown } from 'lucide-react'
import * as React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export interface IMenuSideItemProps {
  item?: IMenuItem
}

export default function MenuSideItem(props: IMenuSideItemProps) {
  const { item } = props

  const navigate = useNavigate()
  const { activeMenu, activeMenuRootId, setActiveMenu } = useMenuContext()
  const { user } = useAuth()

  const location = useLocation()

  const [open, setOpen] = React.useState(!!item?.options?.open)

  const toggle = () => setOpen((o) => !o)

  const hasPermissionsMenu = (menuItem?: IMenuItem): boolean => {
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

  React.useEffect(() => {
    setOpen(activeMenu?.id === item?.id || activeMenuRootId === item?.id)
  }, [activeMenu, activeMenuRootId])

  if (item?.hiddenOnMenu || !hasPermissionsMenu(item)) {
    return <></>
  }

  return (
    <li>
      <a
        onClick={onClickMenuItem}
        className={classNames(
          'side-menu cursor-pointer',
          (activeMenu?.id === item?.id ||
            activeMenuRootId === item?.id ||
            location.pathname === item?.url ||
            item?.childrenLink?.includes(location.pathname)) &&
            'side-menu--active'
        )}
      >
        {/* side-menu--active */}
        <div className="side-menu__icon">
          {item?.iconName && <Icon iconName={item?.iconName} />}
        </div>
        <div className="side-menu__title">
          {item?.name}
          {!!item?.children?.length && !item.children[0].hiddenOnMenu && (
            <ChevronDown
              className={classNames(
                'side-menu__sub-icon',
                open && 'rotate-180 transform'
              )}
            />
          )}
        </div>
      </a>
      <ul className={classNames(open && 'side-menu__sub-open')}>
        {item?.children?.map((subItem) => (
          <MenuSideItem key={subItem.id} item={subItem} />
        ))}
      </ul>
    </li>
  )
}
