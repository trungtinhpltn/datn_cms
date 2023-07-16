import useMenuContext from 'contexts/menu'

import MenuSideItem from './MenuSideItem'

export interface ISideMenuProps {}

export default function SideMenu(props: ISideMenuProps) {
  const { menuList } = useMenuContext()
  return (
    <nav className="side-nav">
      <ul>
        {menuList?.length &&
          menuList.map((item) => <MenuSideItem key={item?.id} item={item} />)}
      </ul>
    </nav>
  )
}
