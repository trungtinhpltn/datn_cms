import classNames from 'classnames'
import Popup from 'components/Layout/Popup'
import type { ITableFood } from 'models/table-food'
import React, { useState } from 'react'

const SelectTable = ({
  show,
  closePopup,
  handleUpdateOrder,
  listTable,
  title
}: {
  show: boolean
  closePopup: () => void
  handleUpdateOrder: (id: number) => void
  listTable: ITableFood[]
  title: string
}) => {
  const [selectTb, setSelectTb] = useState<ITableFood | null>(null)
  const handleSelectTable = () => {
    if (!selectTb?.id) return
    handleUpdateOrder(selectTb?.id)
  }

  return (
    <>
      <Popup
        closePopup={() => {
          closePopup()
        }}
        show={show}
        title={title}
      >
        <div className="intro-y col-span-12">
          <div className="intro-y box">
            <div className="scrollbar-hidden max-h-[70vh] overflow-auto">
              <div className="modal-body mt-5 p-0">
                <div className="grid grid-cols-4 gap-4 px-6">
                  {listTable?.map((item) => (
                    <button
                      className={`rounded-lg p-5 font-medium ${
                        selectTb?.id === item?.id
                          ? `bg-primary text-white`
                          : `bg-secondary text-dark`
                      }`}
                      key={`sl-tb-${item?.id}`}
                      onClick={() => {
                        if (selectTb?.id === item?.id) {
                          setSelectTb(null)
                          return
                        }
                        setSelectTb(item)
                      }}
                    >
                      <p className="text-center">{item?.name}</p>
                      <p className="text-center">{item?.description}</p>
                    </button>
                  ))}
                </div>
                <div className="mt-6 px-5 pb-8 text-center">
                  <button
                    type="button"
                    className={classNames('btn btn-primary w-36')}
                    disabled={!selectTb}
                    onClick={handleSelectTable}
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Popup>
    </>
  )
}

export default SelectTable
