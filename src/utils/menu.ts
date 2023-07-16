import type { IMenuItem } from 'common/menu.type'

export function findByPath(
  menus: Array<IMenuItem>,
  url: string
): IMenuItem | null {
  if (!menus.length) {
    return null
  }
  for (const menu of menus) {
    const found = menu.url === url ? menu : findByPath(menu.children || [], url)
    if (found) {
      return found
    }
  }
  return null
}
