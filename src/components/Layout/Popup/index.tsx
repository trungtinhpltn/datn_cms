import classNames from 'classnames'
import Icon from 'components/Icon'
import React, { memo } from 'react'
import ReactDOM from 'react-dom'

export type PopupSize = 'sm' | 'md' | 'lg'
export interface IPopupProps {
  closePopup: () => void
  show: boolean
}

const Popup = ({
  children,
  closePopup,
  show,
  className,
  title,
  size = 'md'
}: {
  children: React.ReactNode
  closePopup: () => void
  show: boolean
  className?: string
  title?: string
  size?: PopupSize
}): JSX.Element => {
  return ReactDOM.createPortal(
    <div
      className={classNames(
        'fixed inset-0 z-[201] transition-all duration-[400ms]',
        show ? 'visible opacity-100' : 'invisible opacity-0',
        className
      )}
    >
      <div className="fixed inset-0 cursor-pointer bg-black opacity-50" />
      <div className=" flex h-screen w-screen items-center justify-center">
        <div
          className={classNames({
            'w-1/2 lg:w-1/2': size === 'lg',
            'w-1/2 lg:w-1/3': size === 'md' || !size,
            'w-80 lg:w-80': size === 'sm'
          })}
        >
          <div className="intro-y col-span-12">
            <div className="intro-y box">
              <div
                className={`flex flex-col items-center p-4 dark:border-darkmode-400 sm:flex-row ${
                  title ? `border-b border-slate-200/60` : ``
                }`}
              >
                <h2 className="mr-auto text-base font-medium">{title}</h2>
                <Icon
                  iconName="X"
                  className="h-8 w-8 cursor-pointer text-slate-400"
                  onClick={() => {
                    closePopup()
                    document.body.style.overflow = 'auto'
                  }}
                />
              </div>
              <div className="scrollbar-hidden max-h-[70vh] overflow-auto">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default memo(Popup)
