import classNames from 'classnames'
import InputArea from 'components/Form/InputArea'
import Popup from 'components/Layout/Popup'
import React, { useEffect, useState } from 'react'

const CancelOrder = ({
  show,
  closePopup,
  handleCancel
}: {
  show: boolean
  closePopup: () => void
  handleCancel: (msg: string) => void
}) => {
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (!show) {
      setMsg('')
    }
  }, [show])
  return (
    <Popup
      closePopup={() => {
        closePopup()
      }}
      show={show}
      title="Vui lòng nhập lý do hủy yêu cầu"
    >
      <div className="intro-y col-span-12">
        <div className="intro-y box">
          <div className="scrollbar-hidden max-h-[70vh] overflow-auto">
            <div className="modal-body mt-5 p-0">
              <div className="px-6">
                <InputArea
                  rows={4}
                  value={msg}
                  onChange={(value: string) => setMsg(value)}
                />
              </div>
              <div className="mt-6 px-5 pb-8 text-center">
                <button
                  type="button"
                  className={classNames('btn btn-primary w-36')}
                  onClick={() => handleCancel(msg)}
                  disabled={!msg}
                >
                  Hủy yêu cầu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Popup>
  )
}

export default CancelOrder
