import classNames from 'classnames'
import * as React from 'react'
import { createPortal } from 'react-dom'

export interface ILoadingScreenProps {
  show?: boolean
  className?: string
}

export default function LoadingScreen({
  show = true,
  className
}: ILoadingScreenProps) {
  React.useEffect(() => {
    document.body.classList.toggle('body-loading', show)
  }, [show])
  return createPortal(
    <div
      className={classNames(
        `fixed top-0 left-0 z-[1000] flex h-full w-full items-center justify-center bg-white bg-cover transition-opacity`,
        className,
        show
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      )}
    >
      <div className="border-colorcs-FA5E00 h-12 w-12 animate-spin rounded-[50%] border-4 border-t-4 border-t-transparent" />
    </div>,
    document.body
  )
}
