import Button from 'components/Button'
import Loading from 'components/Loading'
import { BASE_ORDER, BASE_TABLEFOOD_LINK } from 'contants/baseLink'
import useMenuContext from 'contexts/menu'
import type { IOrder } from 'models/order'
import { useCallback, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router'
import {
  cancelOrderByid,
  getOrderByid,
  updateSelectTableOrder
} from 'services/order.service'
import {
  formatDate,
  formatDateString,
  replaceDistrict,
  replaceProvince
} from 'utils'
import { toastError, toastSuccess } from 'utils/toast'

import CancelOrder from '../components/CancelOrder'
import SelectTable from '../components/SelectTable'

const OrderDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { setActiveMenu } = useMenuContext()

  const [reload, setReload] = useState(false)
  const { data } = useQuery({
    queryKey: ['order-detail', id, reload],
    queryFn: () => getOrderByid(+(id + '')),
    enabled: !!id
  })
  const [showCancel, setShowCancel] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const updateOrder = useMutation({
    mutationFn: (data: IOrder) =>
      updateSelectTableOrder({ id: +(data?.id + ''), data }),
    onSuccess: () => {
      toastSuccess(
        data?.confirm ? 'Đổi bàn thành công' : 'Xác nhận yêu cầu thành công'
      )
      setShowConfirm(false)
      setReload((pre) => !pre)
    },
    onError: (err: any) => {
      toastError(err?.message)
    }
  })

  const cancelOrder = useMutation({
    mutationFn: (msg: string) => cancelOrderByid(+(id + ''), msg),
    onSuccess: () => {
      toastSuccess('Hủy yêu cầu thành công')
      navigate(BASE_ORDER)
    },
    onError: (err: any) => {
      toastError(err?.message)
    }
  })

  const handleCancel = async (msg: string) => {
    cancelOrder.mutate(msg)
  }

  const checkTimeValid = useCallback(() => {
    if (!data.id) return false
    const nowTime = new Date().getTime()
    const orderTime = new Date(
      data.date + ' ' + data.time.replace('h', '')
    ).getTime()
    if (orderTime - nowTime > 0) {
      return true
    }
    return false
  }, [data])

  return (
    <>
      <Loading show={updateOrder.isLoading || cancelOrder.isLoading} />
      <div className="mt-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="mr-auto text-2xl font-medium">Thông tin đặt bàn</h2>
            <div className="mt-5 grid grid-cols-1 gap-4 text-lg font-medium">
              <span>Tên liên hệ: {data?.name}</span>
              <span>SĐT: {data?.phone}</span>
              <span>Email: {data?.email}</span>
              <span>
                Nhà hàng:{' '}
                {`${data?.Restaurant?.name} (${
                  data?.Restaurant?.addressDetail
                }, ${replaceDistrict(
                  data?.Restaurant?.District?.name
                )}, ${replaceProvince(data?.Province?.Restaurant?.name)})`}
              </span>
              <span>Người lớn: {data?.person}</span>
              <span>Trẻ em: {data?.children}</span>
              <span>Giờ đến: {data?.time}</span>
              <span>Ngày đặt: {formatDateString(data?.date)}</span>
              <span>Thời gian tạo yêu cầu: {formatDate(data?.createdAt)}</span>
              <span>Key: {data?.key}</span>
              {data?.tableId && <span>Bàn: {data?.TableFood?.name}</span>}
            </div>
            {data?.confirm && data?.tableId ? (
              <div className="mt-5 flex">
                <Button
                  color="danger"
                  className="mr-2 w-[30px] sm:w-auto"
                  iconName="Trash"
                  size="lg"
                  outline
                  onClick={() => setShowCancel(true)}
                >
                  Hủy yêu cầu
                </Button>

                <Button
                  color="success"
                  className="mr-2 !w-[150px] sm:w-auto"
                  size="lg"
                  iconName="Move"
                  outline
                  onClick={() => {
                    navigate(BASE_TABLEFOOD_LINK + '/' + data?.tableId)
                    setActiveMenu({
                      id: 'manager-table-food',
                      name: 'Quản lý bàn ăn',
                      url: '/quan-ly-ban-an',
                      iconName: 'Home',
                      children: []
                    })
                  }}
                >
                  Đến bàn
                </Button>
                <Button
                  color="primary"
                  className="mr-2 !w-[150px] sm:w-auto"
                  size="lg"
                  iconName="RefreshCw"
                  onClick={() => {
                    if (checkTimeValid()) {
                      setShowConfirm(true)
                      return
                    }
                    toastError('Đã quá thời gian có thể đổi bàn.')
                  }}
                >
                  Đổi bàn
                </Button>
              </div>
            ) : (
              <div className="mt-5">
                <Button
                  color="danger"
                  className="mr-2 w-[30px] sm:w-auto"
                  iconName="Trash"
                  size="md"
                  outline
                  onClick={() => setShowCancel(true)}
                >
                  Hủy yêu cầu
                </Button>
                <Button
                  color="primary"
                  className="mr-2 w-[30px] sm:w-auto"
                  iconName="CalendarCheck2"
                  size="md"
                  onClick={() => {
                    if (checkTimeValid()) {
                      setShowConfirm(true)
                      return
                    }
                    toastError(
                      'Thời gian xác nhận đã quá muộn. Vui lòng hủy yêu cầu này.'
                    )
                  }}
                >
                  Xác nhận
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      {showCancel && (
        <CancelOrder
          show={showCancel}
          closePopup={() => setShowCancel(false)}
          handleCancel={handleCancel}
        />
      )}
      {showConfirm && (
        <SelectTable
          show={showConfirm}
          closePopup={() => setShowConfirm(false)}
          handleUpdateOrder={(tableId: number) => {
            updateOrder.mutate({ ...data, confirm: true, tableId })
          }}
          title={data?.confirm ? `Chọn bàn` : 'Vui lòng chọn bàn đặt trước'}
        />
      )}
    </>
  )
}

export default OrderDetail
