import Button from 'components/Button'
import ListView from 'components/ListView'
import Loading from 'components/Loading'
import Select from 'components/Select'
import { BASE_BILL, BASE_ORDER } from 'contants/baseLink'
import { QueryKey } from 'contants/query'
import { useGlobalContext } from 'contexts/global'
import useMenuContext from 'contexts/menu'
import { usePopup } from 'contexts/popup'
import type { IBillInfo, IBillItem, ICustomer } from 'models/bill'
import { type ITableFood, tableFoodStatusToText } from 'models/table-food'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate, useParams } from 'react-router'
import { getApiUrl } from 'services'
import {
  createBill,
  createBillItem,
  deleteBill,
  getBillById
} from 'services/bill.service'
import { getAllByRestaurant } from 'services/menu.service'
import { cancelOrderByid } from 'services/order.service'
import { getTableFoodById } from 'services/tablefood.service'
import { formatDate, formatDateString, replaceTime } from 'utils'
import { reactFormatter, reloadTable } from 'utils/tabulator-tables'
import { toastError, toastSuccess } from 'utils/toast'

import BillItem from '../components/BillItem'
import CancelOrder from './components/CancelOrder'
import FieldAction from './components/FiledAction'
import FilterAction from './components/FilterAction'
import ShowStatus from './components/ShowStatus'

const TableDetail = () => {
  const { id } = useParams()
  const { restaurantSelect } = useGlobalContext()
  const { showPopupConfirm } = usePopup()
  const { setActiveMenu } = useMenuContext()
  const [showCancel, setShowCancel] = useState(false)
  const [bill, setBill] = useState<IBillInfo | null>(null)
  const [listItem, setListItem] = useState<ITableFood[]>([])
  const navigate = useNavigate()

  const [data, setData] = useState<ITableFood>()

  const getMenuItem = useCallback(async () => {
    if (!restaurantSelect?.id) return
    const res: any = await getAllByRestaurant(restaurantSelect?.id)
    setListItem(res)
  }, [restaurantSelect?.id])

  const getBillData = useCallback(async (billId: number) => {
    try {
      const bill = await getBillById(billId)
      setBill(bill)
    } catch (error: any) {
      toastError(error.message)
    }
  }, [])

  const getData = useCallback(async () => {
    if (!id) return
    const res: any = await getTableFoodById(+id)
    setData(res?.data)
    if (res?.data?.BillTableOrder) {
      getBillData(res?.data?.BillTableOrder?.billId)
    }
  }, [id, getBillData])

  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    getMenuItem()
  }, [getMenuItem])

  const cancelOrder = useMutation({
    mutationFn: (msg: string) => cancelOrderByid(+(data?.orderId + ''), msg),
    onSuccess: () => {
      toastSuccess('Hủy yêu cầu thành công')
      getData()
      setShowCancel(false)
      reloadTable()
    },
    onError: (err: any) => {
      toastError(err?.message)
    }
  })

  const handleCancel = (msg: string) => {
    if (!data?.orderId) return
    cancelOrder.mutate(msg)
  }

  const confirmUseTable = () => {
    if (data?.orderId) {
      const nowTime = new Date().getTime()
      const orderTime = new Date(
        data.OrderNext?.date + ' ' + replaceTime(data.OrderNext?.time)
      ).getTime()
      if (orderTime > nowTime) {
        showPopupConfirm({
          title: 'Xác nhận sử dụng bàn',
          message: 'Bạn có chắc muốn sử dụng bàn với yêu cầu này?',
          comfirmCallback: async ({ setShow }) => {
            handleUseTable({
              name: data.OrderNext?.name + '',
              phone: data.OrderNext?.phone + ''
            })
            setShow(false)
          }
        })
      } else {
        showPopupConfirm({
          title: 'Xác nhận sử dụng bàn',
          message:
            'Đã quá thời gian của yêu cầu đặt bàn. Bạn có chắc muốn sử dụng bàn với yêu cầu này?',
          comfirmCallback: async ({ setShow }) => {
            handleUseTable({
              name: data.OrderNext?.name + '',
              phone: data.OrderNext?.phone + ''
            })
            setShow(false)
          }
        })
      }
      return
    }
    showPopupConfirm({
      title: 'Xác nhận sử dụng bàn',
      message: 'Bạn có chắc muốn sử dụng bàn này?',
      comfirmCallback: async ({ setShow }) => {
        handleUseTable()
        setShow(false)
      }
    })
  }

  const handleUseTable = async (customer: ICustomer | null = null) => {
    if (!data?.id) return
    try {
      if (!restaurantSelect) return
      await createBill({
        tableId: data?.id,
        customer: customer,
        restaurantId: +(restaurantSelect.id + '')
      })
      getData()
    } catch (error: any) {
      toastError(error.message)
    }
  }

  const createBillItemMutation = useMutation({
    mutationFn: (data: IBillItem) => createBillItem(data),
    onSuccess: async () => {
      toastSuccess('Thêm món ăn thành công')
      if (!bill) return
      getBillData(bill.id)
    },
    onError: (err: any) => {
      toastError(err?.message)
    }
  })

  const handleAddBillItem = (value: { label: string; value: number }) => {
    if (!bill) return
    createBillItemMutation.mutate({
      billId: bill.id,
      itemId: value.value,
      quantity: 1
    })
  }

  const deleteBillMutation = useMutation({
    mutationFn: (id: number) => deleteBill(id),
    onSuccess: async () => {
      setBill(null)
      getData()
      toastSuccess('Hủy hóa đơn thành công.')
      reloadTable()
    },
    onError: (err: any) => {
      toastError(err?.message)
    }
  })

  const handleCancelBill = () => {
    if (!bill) return
    deleteBillMutation.mutate(bill.id)
  }

  const options = useMemo(() => {
    const idF = bill?.billItems?.map((item) => item.itemId) || []
    return listItem
      .filter((item) => !idF.includes(+(item.id + '')))
      .map((item) => ({
        label: item?.name,
        value: item?.id
      }))
  }, [bill, listItem])

  const handlePayment = () => {
    navigate(BASE_BILL + '/' + bill?.id)
    setActiveMenu({
      id: 'manager-bill',
      name: 'Quản lý hóa đơn',
      url: '/quan-ly-hoa-don',
      iconName: 'Home',
      children: []
    })
  }
  return (
    <>
      <Loading show={cancelOrder.isLoading || deleteBillMutation.isLoading} />
      {showCancel && (
        <CancelOrder
          show={showCancel}
          closePopup={() => setShowCancel(false)}
          handleCancel={handleCancel}
        />
      )}
      <div className="mt-5">
        <div className="flex flex-row gap-6">
          <div
            className={`w-[400px] ${bill ? `border-r-2 border-secondary` : ``}`}
          >
            <h2 className="mr-auto text-2xl font-bold">
              Thông tin {data?.name}
            </h2>
            <div className="mt-7 grid grid-cols-1 gap-4 text-lg">
              <div className="font-medium">Tên bàn: {data?.name}</div>
              <div className="font-medium">Mô tả: {data?.description}</div>
              <div className="font-medium">
                Trạng thái:{' '}
                {data?.status && tableFoodStatusToText[data?.status]}
              </div>
              {data?.orderId && (
                <div className="mt-4 border-t-2 pt-4">
                  <h2 className="mr-auto text-2xl font-bold">
                    Thông tin đặt bàn
                  </h2>
                  <div className="mt-5 grid grid-cols-1 gap-4 text-lg font-medium">
                    <span>Tên liên hệ: {data?.OrderNext?.name}</span>
                    <span>SĐT: {data?.OrderNext?.phone}</span>
                    <span>Email: {data?.OrderNext?.email}</span>

                    <span>Người lớn: {data?.OrderNext?.person}</span>
                    <span>Trẻ em: {data?.OrderNext?.children}</span>
                    <span>Giờ đến: {data?.OrderNext?.time}</span>
                    <span>
                      Ngày đặt: {formatDateString(data?.OrderNext?.date + '')}
                    </span>
                  </div>
                </div>
              )}
            </div>
            {data?.status !== 'ACTIVE' && (
              <div className="mt-6 flex">
                {data?.orderId && (
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
                )}
                <Button
                  color="primary"
                  className="mr-2 !w-[120px] sm:w-auto"
                  size="lg"
                  onClick={confirmUseTable}
                >
                  Sử dụng
                </Button>
              </div>
            )}
          </div>
          {bill && (
            <div className="max-w-[500px] flex-1">
              <h2 className="mr-auto text-2xl font-bold">Thông tin hóa đơn</h2>
              <div className="mt-7 grid grid-cols-1 gap-4 text-lg font-medium">
                {bill.Customer && <span>Khách hàng: {bill.Customer.name}</span>}
                {bill.Customer && <span>SĐT: {bill.Customer.phone}</span>}
                <span>Ngày tạo: {formatDate(bill.createdAt)}</span>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-4 text-lg font-medium">
                <p>Danh sách món đã chọn:</p>
                <div className="grid max-w-[500px] grid-cols-1 bg-white p-4 shadow-sm">
                  {bill && bill.billItems.length === 0 && (
                    <p className="text-center">Trống</p>
                  )}
                  {bill &&
                    bill.billItems.map((item) => (
                      <BillItem
                        key={`billit-${item?.id}`}
                        item={item}
                        callBack={() => getBillData(bill.id)}
                      />
                    ))}
                </div>
                <div className="flex justify-center">
                  <Select
                    handleFunc={(e) => {
                      if (e.value)
                        handleAddBillItem({ label: e.label, value: +e.value })
                    }}
                    value={''}
                    options={options}
                    placeholder={'Thêm món'}
                    className="react-select-container z-[50] w-full"
                  />
                </div>
              </div>
              <div className="mt-6 flex w-full justify-center">
                <Button
                  color="danger"
                  className="mr-2  sm:w-auto"
                  size="lg"
                  iconName="Trash"
                  onClick={() => {
                    showPopupConfirm({
                      title: 'Xác nhận hủy hóa đơn',
                      message: 'Bạn có chắc muốn hủy hóa đơn này?',
                      comfirmCallback: async ({ setShow }) => {
                        handleCancelBill()
                        setShow(false)
                      }
                    })
                  }}
                >
                  Hủy hóa đơn
                </Button>
                <Button
                  color="primary"
                  className="mr-2  sm:w-auto"
                  size="lg"
                  iconName="DollarSign"
                  onClick={handlePayment}
                >
                  Thanh toán
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="mt-5 border-t-2">
          <ListView
            defaultFilterObject={
              restaurantSelect
                ? { restaurant_id: restaurantSelect.id, table_id: id }
                : {
                    table_id: id
                  }
            }
            queryKey={QueryKey.TABLE_ORDER}
            title={`Yêu cầu đặt bàn`}
            actions={<FilterAction />}
            apiUrl={getApiUrl(`/order/getOrder`)}
            autoGenerateIndex={true}
            customConfigOptions={{ paginationSize: 20 }}
            columns={[
              {
                title: 'Tên liên hệ',
                responsive: 0,
                field: 'name',
                vertAlign: 'middle',
                hozAlign: 'left',
                headerHozAlign: 'left',
                download: false,
                headerSort: false,
                cssClass: '!inline-block',
                frozen: true
              },
              {
                title: 'SĐT',
                responsive: 0,
                field: 'phone',
                vertAlign: 'middle',
                hozAlign: 'left',
                headerHozAlign: 'left',
                download: false,
                headerSort: false,
                cssClass: '!inline-block',
                frozen: true
              },
              {
                title: 'email',
                responsive: 0,
                field: 'email',
                vertAlign: 'middle',
                hozAlign: 'left',
                headerHozAlign: 'left',
                download: false,
                headerSort: false,
                cssClass: '!inline-block',
                frozen: true
              },
              {
                title: 'Giờ đến',
                responsive: 0,
                field: 'time',
                vertAlign: 'middle',
                hozAlign: 'left',
                headerHozAlign: 'left',
                download: false,
                headerSort: false,
                cssClass: '!inline-block',
                frozen: true
              },
              {
                title: 'Ngày đặt',
                responsive: 0,
                field: 'date',
                vertAlign: 'middle',
                headerHozAlign: 'left',
                hozAlign: 'left',
                download: false,
                cssClass: '!inline-block',
                headerSort: false,
                formatter: function (cell) {
                  const value = cell.getValue()
                  return formatDateString(value)
                },
                formatterParams: {
                  invalidPlaceholder: '(invalid date)'
                }
              },
              {
                title: 'Thời gian tạo yêu cầu',
                responsive: 0,
                field: 'createdAt',
                vertAlign: 'middle',
                headerHozAlign: 'left',
                hozAlign: 'left',
                download: false,
                cssClass: '!inline-block',
                headerSort: false,
                formatter: function (cell) {
                  const value = cell.getValue()
                  return formatDate(value)
                },
                formatterParams: {
                  invalidPlaceholder: '(invalid date)'
                }
              },

              {
                title: 'Trạng thái',
                responsive: 0,
                field: 'confirm',
                vertAlign: 'middle',
                headerHozAlign: 'left',
                hozAlign: 'left',
                download: false,
                cssClass: '!inline-block',
                headerSort: false,
                formatter: reactFormatter(<ShowStatus />)
              },
              {
                title: 'Thao tác',
                width: 150,
                field: 'id',
                vertAlign: 'middle',
                download: false,
                headerHozAlign: 'left',
                formatter: reactFormatter(
                  <FieldAction
                    navigateLink={(id: number | string) => {
                      navigate(BASE_ORDER + `/${id}`)
                      setActiveMenu({
                        id: 'manager-order',
                        name: 'Quản lý đặt bàn',
                        url: '/quan-ly-dat-ban',
                        iconName: 'Home',
                        children: []
                      })
                    }}
                  />
                ),
                headerSort: false
              }
            ]}
          />
        </div>
      </div>
    </>
  )
}

export default TableDetail
