import classNames from 'classnames'
import type { IconsName } from 'common/common.type'
import Icon from 'components/Icon'
import useOnClickOutside from 'hooks/useOnClickOutside'
import type { ReactNode } from 'react'
import { useRef, useState } from 'react'

export interface IDropdownProps {
  className?: string
  btnClassName?: string
  forceBtnClassName?: string
  contentClassName?: string
  title: React.ReactNode | string
  items?: IDropdownItemProps[]
  children?: ReactNode
  onSelect?: (item: IDropdownItemProps) => void
  onClick?: () => void | undefined
}

export interface IDropdownItemProps extends Record<string, any> {
  id: string | number
  title: React.ReactNode | string
  iconName?: IconsName | undefined
  onClick?: () => void | undefined
}

export default function Dropdown({
  className,
  btnClassName,
  forceBtnClassName,
  contentClassName,
  title,
  items,
  children,
  onSelect
}: IDropdownProps) {
  const ref = useRef(null)
  const [show, setShow] = useState(false)
  useOnClickOutside(ref, () => setShow(false))
  return (
    <div className={classNames('dropdown relative', className)} ref={ref}>
      <button
        className={
          forceBtnClassName || classNames('dropdown-toggle btn', btnClassName)
        }
        aria-expanded="false"
        data-tw-toggle="dropdown"
        onClick={() => setShow(!show)}
      >
        {title}
      </button>
      <div
        className={classNames(
          'dropdown-menu w-40',
          show && 'show',
          contentClassName
        )}
      >
        {items && (
          <ul className="dropdown-content dark:text-white">
            {items.map((item) => (
              <li key={item.id}>
                <div
                  onClick={() => {
                    onSelect && onSelect(item)
                    setShow(false)
                    item.onClick && item.onClick()
                  }}
                  className="dropdown-item cursor-pointer"
                >
                  {item.iconName && (
                    <Icon iconName={item.iconName} className="mr-2 h-4 w-4" />
                  )}
                  <p className="truncate">{item.title}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
        {children}
      </div>
    </div>
  )
}
