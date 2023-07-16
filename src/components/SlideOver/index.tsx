import classNames from 'classnames'
import Icon from 'components/Icon'
import type { ReactNode } from 'react'
import ReactDOM from 'react-dom'

interface SlideOverProps {
  isCloseBtn?: boolean
  children: ReactNode
  closeSlideOver: () => void
  show: boolean
}

const SlideOver = ({
  isCloseBtn,
  children,
  closeSlideOver,
  show
}: SlideOverProps): JSX.Element => {
  return ReactDOM.createPortal(
    <div
      className={classNames(
        'fixed inset-0 z-[201] transition-all duration-[400ms]',
        show ? 'visible opacity-100' : 'invisible opacity-0'
      )}
    >
      <div className="fixed inset-0 cursor-pointer bg-black bg-opacity-50" />
      <div className="flex h-full w-screen items-center justify-end">
        <div className="relative flex h-full w-1/2">
          {isCloseBtn && (
            <Icon
              iconName="X"
              className="absolute -left-10 top-2 h-8 w-8 cursor-pointer text-slate-400"
              onClick={() => {
                closeSlideOver()
                document.body.style.overflow = 'auto'
              }}
            />
          )}
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default SlideOver
