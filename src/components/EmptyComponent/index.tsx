import * as React from 'react'
import { Outlet } from 'react-router'

export interface IEmptyComponentProps {
  withOutlet?: boolean
}

export default function EmptyComponent({ withOutlet }: IEmptyComponentProps) {
  return withOutlet ? <Outlet /> : <></>
}
