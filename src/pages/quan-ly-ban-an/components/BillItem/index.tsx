import Icon from 'components/Icon'
import Loading from 'components/Loading'
import type { IBillItem } from 'models/bill'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { deleteBillItem, updateBillItem } from 'services/bill.service'
import { formatCurecy } from 'utils'
import { toastError, toastSuccess } from 'utils/toast'

const BillItem = ({
  item,
  callBack,
  payment = false,
  isPayment = false
}: {
  item: IBillItem
  callBack: () => void
  payment?: boolean
  isPayment?: boolean
}) => {
  const [quantity, setQuantity] = useState(item.quantity || 1)
  const [canEdit, setCanEdit] = useState(false)

  useEffect(() => {
    setQuantity(item.quantity || 1)
  }, [item.quantity])

  const handleChangeQuantity = (value: string) => {
    if (!value || parseInt(value) === 0) {
      setQuantity(1)
      return
    }
    const regex = /^\d*(\.\d+)?$/
    if (value.match(regex)) {
      setQuantity(parseInt(value))
    }
  }

  const updateBillItemMutaion = useMutation({
    mutationFn: () =>
      updateBillItem({
        id: item?.id,
        quantity: quantity,
        billId: item?.billId,
        itemId: item?.itemId
      }),
    onSuccess: async () => {
      callBack()
    },
    onError: (err: any) => {
      toastError(err?.message)
    }
  })

  const handleUpdateQuantity = () => {
    setCanEdit(false)
    if (quantity === item.quantity) return
    updateBillItemMutaion.mutate()
  }

  const deleteBillItemMutaion = useMutation({
    mutationFn: (id: number) => deleteBillItem(id),
    onSuccess: () => {
      toastSuccess('Xóa thành công')
      callBack()
    },
    onError: (err: any) => {
      toastError(err?.message)
    }
  })

  const handleRemoveItem = () => {
    if (!item.id) return
    deleteBillItemMutaion.mutate(item.id)
  }

  const getPrice = (price = 0, quantity = 1) => {
    return formatCurecy(price * quantity + '')
  }

  return (
    <>
      <Loading
        show={
          updateBillItemMutaion.isLoading || deleteBillItemMutaion.isLoading
        }
      />
      <div
        className="mb-3 border-b pb-4 last:mb-0 last:border-0 last:pb-0"
        key={`billit-${item?.id}`}
      >
        <div className="flex items-center justify-between gap-4">
          <span>{item.MenuItem?.name}</span>
          {isPayment ? (
            <div className="flex shrink-0 flex-nowrap items-center justify-end">
              <span className="mr-3">Số lượng: {item?.quantity}</span>
            </div>
          ) : (
            <div className="flex shrink-0 flex-nowrap items-center justify-end">
              <span className="mr-3">SL:</span>
              <ul className="flex flex-nowrap items-center">
                <li className="leading-[0px]">
                  <button
                    className="h-6 w-9 rounded bg-primary"
                    onClick={() => {
                      quantity > 1 && setQuantity(quantity - 1)
                    }}
                    disabled={!canEdit}
                  >
                    <span className="text-2xl font-bold leading-[0px] text-[#ffffff]">
                      -
                    </span>
                  </button>
                </li>
                <li className="mx-1 leading-[0px]">
                  <input
                    type="text"
                    className="h-9 w-16 appearance-none rounded border p-2 text-center text-base font-bold leading-tight text-gray-700 focus:border-primary focus:outline-none"
                    value={quantity}
                    disabled={!canEdit}
                    onChange={(e) => handleChangeQuantity(e.target.value)}
                  />
                </li>
                <li className="leading-[0px]">
                  <button
                    className="h-6 w-9 rounded bg-primary"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={!canEdit}
                  >
                    <span className="text-2xl font-bold leading-[0px]  text-[#ffffff]">
                      +
                    </span>
                  </button>
                </li>
              </ul>
              {canEdit ? (
                <Icon
                  iconName="CheckSquare"
                  className="ml-2 cursor-pointer"
                  onClick={handleUpdateQuantity}
                  color="#0D9488"
                />
              ) : (
                <Icon
                  iconName="Edit"
                  className="ml-2 cursor-pointer"
                  onClick={() => setCanEdit(true)}
                />
              )}
              <Icon
                iconName="Trash"
                className="ml-2 cursor-pointer text-danger"
                onClick={() => handleRemoveItem()}
              />
            </div>
          )}
        </div>
        {payment && (
          <div className="mt-1 flex items-center gap-2">
            <span>Thành tiền:</span>
            <div className="flex flex-1 shrink-0 flex-nowrap items-center justify-between">
              <p>
                {item?.MenuItem && item?.MenuItem?.discountPrice > 0 && (
                  <span className="mr-2 line-through">
                    {item?.MenuItem?.price}
                  </span>
                )}
                <span className="mr-1">
                  {formatCurecy(
                    (item?.MenuItem && item?.MenuItem?.discountPrice > 0
                      ? item?.MenuItem?.discountPrice
                      : item?.MenuItem?.price) + '',
                    { type: '.', unit: '' }
                  )}
                </span>
                * {item?.quantity}
              </p>
              <div className="grid grid-cols-1">
                {getPrice(
                  item?.MenuItem && item?.MenuItem?.discountPrice > 0
                    ? item?.MenuItem?.discountPrice
                    : item?.MenuItem?.price,
                  item?.quantity
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default BillItem
