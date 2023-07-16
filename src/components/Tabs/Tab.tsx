import classNames from 'classnames'
import type { ReactNode } from 'react'

import Item from './TabItem'

const TYPE_TAB = {
  boxedTab: 'nav-boxed-tabs',
  linkTab: 'nav-link-tabs',
  basicTab: 'nav-tabs',
  postTabs: 'post__tabs nav-tabs'
}

export interface ITabListsData {
  children: ReactNode
  tabListClassName?: string
  typeTab?: keyof typeof TYPE_TAB
}
const Tab = ({
  children,
  tabListClassName,
  typeTab = 'linkTab'
}: ITabListsData) => {
  return (
    <ul
      className={classNames('nav', TYPE_TAB[typeTab], tabListClassName)}
      role="tablist"
    >
      {children}
    </ul>
  )
}

Tab.Item = Item

export default Tab
