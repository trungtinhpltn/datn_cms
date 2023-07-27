import type { IMenuItem } from 'common/menu.type'
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react'
import { createContext, useContext, useMemo, useState } from 'react'

export const MenuContext = createContext<{
  menuList?: Array<IMenuItem>
  activeMenu?: IMenuItem
  activeMenuRootId?: number | string | null
  setActiveMenu: Dispatch<SetStateAction<IMenuItem | undefined>>
}>({
  setActiveMenu: function (): void {
    throw new Error('Function not implemented.')
  }
})

export const useMenuContext = () => useContext(MenuContext)

export const menuInit: Array<IMenuItem> = [
  {
    id: 'home',
    name: 'Dashboard',
    url: '/',
    iconName: 'Zap',
    children: [],
    role: ['ADMIN', 'MANAGER']
  },
  {
    id: 'manager-restaurant',
    name: 'Quản lý nhà hàng',
    url: '/quan-ly-nha-hang',
    iconName: 'Home',
    role: ['ADMIN'],
    children: []
  },
  {
    id: 'manager-table-food',
    name: 'Quản lý bàn ăn',
    url: '/quan-ly-ban-an',
    iconName: 'Table',
    children: [],
    role: ['ADMIN', 'MANAGER']
  },
  {
    id: 'manager-order',
    name: 'Quản lý đặt bàn',
    url: '/quan-ly-dat-ban',
    iconName: 'Scroll',
    children: [],
    role: ['ADMIN', 'MANAGER']
  },
  {
    id: 'manager-menu',
    name: 'Quản lý thực đơn',
    url: '/quan-ly-thuc-don',
    iconName: 'Book',
    role: ['ADMIN', 'MANAGER'],
    children: [
      {
        id: 'manager-menu-list',
        name: 'Thực đơn',
        url: '/quan-ly-thuc-don',
        iconName: 'CircleDot',
        children: [],
        childrenLink: ['/quan-ly-thuc-don/create'],
        role: ['ADMIN', 'MANAGER']
      },
      {
        id: 'manager-menu-category',
        name: 'Phân loại đồ',
        url: '/quan-ly-thuc-don/category',
        iconName: 'CircleDot',
        children: [],
        role: ['ADMIN', 'MANAGER']
      },
      {
        id: 'manager-menu-unit',
        name: 'Phân loại đợn vị tính',
        url: '/quan-ly-thuc-don/unit',
        iconName: 'CircleDot',
        children: [],
        role: ['ADMIN', 'MANAGER']
      }
    ]
  },

  {
    id: 'manager-bill',
    name: 'Quản lý hóa đơn',
    url: '/quan-ly-hoa-don',
    iconName: 'DollarSign',
    children: [],
    role: ['ADMIN', 'MANAGER']
  },
  {
    id: 'manager-staff',
    name: 'Quản lý nhân viên',
    url: '/quan-ly-nhan-vien',
    iconName: 'Users',
    children: [],
    role: ['ADMIN', 'MANAGER']
  },
  {
    id: 'manager-job-time',
    name: 'Quản lý ca làm việc',
    iconName: 'Calendar',
    role: ['ADMIN', 'MANAGER'],
    url: '/quan-ly-ca-lam-viec',
    children: [
      {
        id: 'manager-job-time-res',
        name: 'Nhà hàng',
        url: '/quan-ly-ca-lam-viec',
        iconName: 'CircleDot',
        children: [],
        role: ['ADMIN', 'MANAGER']
      },
      {
        id: 'manager-job-time-pre',
        name: 'Cá nhân',
        url: '/quan-ly-ca-lam-viec/ca-nhan',
        iconName: 'CircleDot',
        children: [],
        role: ['MANAGER']
      }
    ]
  },
  {
    id: 'user-info',
    name: 'Thông tin cá nhân',
    url: '/thong-tin-ca-nhan',
    iconName: 'Home',
    role: ['MANAGER', 'EMPLOYEE']
  },
  {
    id: 'user-shift',
    name: 'Ca làm việc',
    url: '/ca-lam-viec',
    iconName: 'Home',
    role: ['EMPLOYEE']
  }
]

export const MenuProvider = ({ children }: PropsWithChildren) => {
  const [menuList] = useState<IMenuItem[]>(menuInit)
  const [activeMenu, setActiveMenu] = useState<IMenuItem>()

  const activeMenuRootId = useMemo(() => {
    if (!activeMenu || !menuList.length) {
      return null
    }

    const isChildrenContainId = (id: number | string, menuItem: IMenuItem) => {
      for (const subMenu of menuItem.children || []) {
        if (subMenu.id === id) {
          return true
        }
        isChildrenContainId(id, subMenu)
      }
      return false
    }

    for (const rootMenu of menuList) {
      if (isChildrenContainId(activeMenu.id, rootMenu)) {
        return rootMenu.id
      }
    }
    return null
  }, [activeMenu, menuList])

  return (
    <MenuContext.Provider
      value={{
        menuList,
        activeMenu,
        activeMenuRootId,
        setActiveMenu
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}

export default useMenuContext
