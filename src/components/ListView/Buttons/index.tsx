import type { ButtonProps } from 'components/Button'
import Button from 'components/Button'
import type { IDropdownItemProps, IDropdownProps } from 'components/Dropdown'
import Dropdown from 'components/Dropdown'
import * as React from 'react'

import { useListViewCtx } from '..'

export interface IListViewButton extends Omit<ButtonProps, 'onClick'> {
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    table?: Tabulator
  ) => void
}

export interface IListViewDropdown extends Omit<IDropdownProps, 'onSelect'> {
  onSelect?: (item: IDropdownItemProps, table?: Tabulator) => void
}

export type TListViewButtonOrDropdown = {
  id: string
  title: string | React.ReactNode
} & (
  | ({ type: 'button' } & IListViewButton)
  | ({ type: 'dropdown' } & IListViewDropdown)
)

export interface IListViewButtonsProps {
  buttons: TListViewButtonOrDropdown[]
}

export default function ListViewButtons(props: IListViewButtonsProps) {
  const { buttons } = props
  const { table } = useListViewCtx()
  return (
    <>
      {buttons.map((button) => {
        if (button.type === 'button') {
          return (
            <Button
              key={button.id}
              {...button}
              onClick={(e) => {
                button?.onClick && button?.onClick(e, table)
              }}
            >
              {button.title}
            </Button>
          )
        }
        if (button.type === 'dropdown') {
          return (
            <Dropdown
              key={button.id}
              {...button}
              onSelect={(item) => {
                button.onSelect && button?.onSelect(item, table)
              }}
            />
          )
        }
        return null
      })}
    </>
  )
}
