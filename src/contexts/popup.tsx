import classnames from 'classnames'
import type { IconsName } from 'common/common.type'
import Icon from 'components/Icon'
import type { PopupSize } from 'components/Layout/Popup'
import Popup from 'components/Layout/Popup'
import { createContext, useContext, useRef, useState } from 'react'

import { _t } from './i18n'

export type ConfirmCallbackProps = { setShow: (show: boolean) => void }
export interface IShowPopupConfirmParams {
  title?: string
  message?: string
  size?: PopupSize
  iconName?: IconsName
  classNameButtonConfirm?: string
  classNameIcon?: string
  titleConfirm?: string
  titleCancel?: string
  comfirmCallback?: (props: ConfirmCallbackProps) => void
  cancelCallback?: (props: ConfirmCallbackProps) => void
}
interface IPopupContextProps {
  showPopupConfirm: (param: IShowPopupConfirmParams) => void
}

const PopupContext = createContext<IPopupContextProps>({
  showPopupConfirm: function (): void {
    throw new Error('Function not implemented.')
  }
})

export const usePopup = () => useContext(PopupContext)

export const PopupProvider = ({ children }: React.PropsWithChildren) => {
  const [title, setTitle] = useState<string>()
  const [message, setMessage] = useState<string>()
  const [size, setSize] = useState<PopupSize>()
  const [show, setShow] = useState<boolean>(false)
  const [iconName, setIconName] = useState<IconsName>()
  const [classNameButtonConfirm, setClassNameButtonConfirm] =
    useState<string>('')
  const [classNameIcon, setClassNameIcon] = useState<string>('')
  const [titleConfirm, setTitleConfirm] = useState<string>('')
  const [titleCancel, setTitleCancel] = useState<string>('')
  const cancelCallbackRef = useRef<(props: ConfirmCallbackProps) => void>(() =>
    setShow(false)
  )
  const confirmCallbackRef = useRef<(props: ConfirmCallbackProps) => void>(() =>
    setShow(false)
  )

  const showPopupConfirm = ({
    title,
    message,
    size,
    iconName,
    classNameButtonConfirm = '',
    classNameIcon = '',
    titleConfirm = _t('ok'),
    titleCancel = _t('cancel'),
    comfirmCallback,
    cancelCallback
  }: IShowPopupConfirmParams) => {
    setTitle(title)
    setMessage(message)
    setIconName(iconName)
    setClassNameButtonConfirm(classNameButtonConfirm)
    setClassNameIcon(classNameIcon)
    setTitleConfirm(titleConfirm)
    setTitleCancel(titleCancel)
    setShow(true)
    setSize(size)
    if (cancelCallback) cancelCallbackRef.current = cancelCallback
    if (comfirmCallback) confirmCallbackRef.current = comfirmCallback
  }

  return (
    <PopupContext.Provider
      value={{
        showPopupConfirm
      }}
    >
      {children}
      <Popup
        show={show}
        closePopup={() => setShow(false)}
        title={title}
        size={size}
      >
        <div className="modal-body p-0">
          <div className="p-5 text-center">
            <div className="flex items-center justify-center">
              {iconName && (
                <Icon
                  iconName={iconName}
                  className={classnames('h-12 w-12', classNameIcon)}
                />
              )}
            </div>
            <div
              className="mt-2 text-slate-500"
              dangerouslySetInnerHTML={{
                __html: message || ''
              }}
            ></div>
          </div>
          <div className="px-5 pb-8 text-center">
            <button
              type="button"
              data-tw-dismiss="modal"
              className="btn btn-outline-secondary mr-1 w-24"
              onClick={() => cancelCallbackRef?.current?.({ setShow })}
            >
              {titleCancel}
            </button>
            <button
              type="button"
              className={classnames(
                'btn btn-primary w-24',
                classNameButtonConfirm
              )}
              onClick={() => confirmCallbackRef?.current?.({ setShow })}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </Popup>
    </PopupContext.Provider>
  )
}
