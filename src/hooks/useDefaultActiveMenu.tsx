import useMenuContext, { menuInit } from 'contexts/menu'
import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { findByPath } from 'utils/menu'

export const useDefaultActiveMenu = () => {
  const location = useLocation()
  const { setActiveMenu } = useMenuContext()

  const getRootPath = (path: string) => path.slice(0, path.indexOf('/', 1))

  const getPreviousPath = (path: string) => path.slice(0, path.lastIndexOf('/'))

  useEffect(() => {
    const path = location.pathname
    let currentMenu = findByPath(menuInit, path)
    if (currentMenu?.hiddenOnMenu) {
      currentMenu = findByPath(menuInit, getPreviousPath(path))
    }
    if (!currentMenu) {
      const newPathname = getRootPath(path)
      currentMenu = findByPath(menuInit, newPathname)
    }
    currentMenu && setActiveMenu(currentMenu)

    // call once when reload page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
