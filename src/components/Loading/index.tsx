import classNames from 'classnames'
import * as React from 'react'
import { createPortal } from 'react-dom'
type LoadingProps = { show: boolean }

export default function Loading({ show }: LoadingProps) {
  React.useEffect(() => {
    document.body.classList.toggle('body-loading', show)
  }, [show])
  return createPortal(
    <div
      className={classNames(
        `fixed top-0 left-0 z-[1000] flex h-full w-full items-center justify-center bg-black bg-cover transition-opacity`,
        show ? `visible opacity-70` : `invisible opacity-0`
      )}
    >
      <div className="border-colorcs-FA5E00 h-12 w-12 animate-spin rounded-[50%] border-4 border-t-4 border-t-primary" />
    </div>,
    document.body
  )
}
