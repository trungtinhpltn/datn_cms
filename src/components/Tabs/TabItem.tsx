import classNames from 'classnames'
import type { MouseEventHandler, ReactNode } from 'react'

export interface IItemTabData {
  label: ReactNode
  id?: string | number
  itemTabClassName?: string
  currentTab: string | number
  activetab: string | number | boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const Item = (props: IItemTabData) => {
  return (
    <li
      key={`item-tab-${props.id}`}
      className={classNames('nav-item flex-1')}
      role="presentation"
    >
      <button
        className={classNames(
          'nav-link w-full py-2',
          props.currentTab === props.activetab && 'active',
          props.itemTabClassName
        )}
        type="button"
        role="tab"
        onClick={props.onClick}
      >
        {props.label}
      </button>
    </li>
  )
}

export default Item
