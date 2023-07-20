import type { IconsName } from './common.type'

export interface IMenuItemOptions {
  open?: boolean
}

export interface IMenuItem {
  id: string | number
  name: string
  url?: string
  iconName?: IconsName
  options?: IMenuItemOptions
  hiddenOnMenu?: boolean
  children?: Array<IMenuItem>
  onClick?: () => void
  role?: string[]
  childrenLink?: string[]
}
