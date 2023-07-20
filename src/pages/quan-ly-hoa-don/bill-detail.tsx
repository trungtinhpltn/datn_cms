/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import Button from 'components/Button'
import InputForm from 'components/Input/InputForm'
import Loading from 'components/Loading'
import Select from 'components/Select'
import { BASE_BILL, BASE_TABLEFOOD_LINK } from 'contants/baseLink'
import { useGlobalContext } from 'contexts/global'
import { _t } from 'contexts/i18n'
import useMenuContext from 'contexts/menu'
import { usePopup } from 'contexts/popup'
import type { IBillInfo, IBillItem } from 'models/bill'
import type { ITableFood } from 'models/table-food'
import BillItem from 'pages/quan-ly-ban-an/components/BillItem'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useNavigate, useParams } from 'react-router'
import {
  createBillItem,
  deleteBill,
  getBillById,
  getCustomerByPhone,
  updateBill
} from 'services/bill.service'
import { getAllByRestaurant } from 'services/menu.service'
import { formatCurecy, formatDate } from 'utils'
import { toastError, toastSuccess } from 'utils/toast'
import { schemaCreatePaymentInfo } from 'validate'

type Inputs = {
  name: string
  phone: string
  paymentMethod: string
  customerPay: number
  paymentPrice: number
  totalPrice: number
  taxPay: number
}

const BillDetail = () => {
  const { id } = useParams()
  const { restaurantSelect } = useGlobalContext()
  const { setActiveMenu } = useMenuContext()
  const navigate = useNavigate()
  const [bill, setBill] = useState<IBillInfo | null>(null)
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalPayment, setTotalPayment] = useState(0)
  const [listItem, setListItem] = useState<ITableFood[]>([])
  const { showPopupConfirm } = usePopup()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<Inputs>({
    mode: 'onChange',
    resolver: yupResolver(schemaCreatePaymentInfo)
  })

  const getBillData = useCallback(async () => {
    try {
      if (!id) return
      const bill = await getBillById(+id)
      setBill(bill)
    } catch (error: any) {
      toastError(error.message)
    }
  }, [id])

  const getMenuItem = useCallback(async () => {
    if (!restaurantSelect?.id) return
    const res: any = await getAllByRestaurant(restaurantSelect?.id)
    setListItem(res)
  }, [restaurantSelect?.id])

  useEffect(() => {
    getBillData()
  }, [getBillData])

  useEffect(() => {
    getMenuItem()
  }, [getMenuItem])

  useEffect(() => {
    if (bill && bill.Customer) {
      setValue('name', bill.Customer?.name)
      setValue('phone', bill.Customer?.phone)
    }
  }, [bill, setValue])

  useEffect(() => {
    if (bill && bill.Customer) return

    if (errors.phone) return

    if (!watch('phone')) return

    try {
      getCustomerByPhone(watch('phone')).then((res) => {
        if (res?.data) {
          setValue('name', res?.data?.name, {
            shouldValidate: true
          })
        }
      })
    } catch (error: any) {
      toastError(error?.message)
    }
  }, [watch('phone'), errors.phone, setValue, bill])

  useEffect(() => {
    let total = bill?.billItems?.reduce((pre, next) => {
      if (!next) return pre + 0
      if (!next?.MenuItem) return pre + 0
      const price =
        next?.MenuItem?.discountPrice > 0
          ? next.MenuItem?.discountPrice * (next.quantity || 1)
          : next.MenuItem?.price * (next.quantity || 1)
      return pre + price
    }, 0)
    total = total || 0
    setTotalPrice(total || 0)
    setTotalPayment(total + Math.floor(total / 10))
    setValue('paymentPrice', total + Math.floor(total / 10), {
      shouldValidate: true
    })
    setValue('totalPrice', total, {
      shouldValidate: true
    })
    setValue('taxPay', Math.floor(total / 10), {
      shouldValidate: true
    })
  }, [bill, setValue])

  const createBillItemMutation = useMutation({
    mutationFn: (data: IBillItem) => createBillItem(data),
    onSuccess: async () => {
      toastSuccess('Thêm món ăn thành công')
      if (!bill) return
      getBillData()
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
      toastSuccess('Hủy hóa đơn thành công.')
      navigate(BASE_BILL)
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

  const updateBillMutation = useMutation({
    mutationFn: (data: any) => updateBill(data?.id, data),
    onSuccess: () => {
      toastSuccess('Thành công')
      getBillData()
    },
    onError: (err: any) => {
      toastError(err?.message)
    }
  })

  const onSubmit = (inputs: Inputs) => {
    if (!bill) return
    updateBillMutation.mutate({
      id: bill?.id,
      ...inputs,
      exportDate: new Date(new Date().toDateString()).getTime() / 1000
    })
  }

  return (
    <>
      <Loading show={false} />
      <div className="mt-5">
        <Button
          color="secondary"
          iconName="ChevronLeft"
          size="sm"
          iconClassName="mr-1"
          className="mr-4 mb-4 px-3"
          outline
          type="button"
          onClick={() => navigate('/quan-ly-hoa-don')}
        >
          {_t('back')}
        </Button>
        {bill && (
          <div className="flex flex-row gap-6">
            {bill.status === 'PENDING' ? (
              <div className="max-w-[500px] flex-1">
                <h2 className="mr-auto text-2xl font-bold">
                  Thông tin hóa đơn
                </h2>
                <div className="mt-7 grid grid-cols-1 gap-4 text-lg font-medium">
                  {bill.Customer && (
                    <span>Khách hàng: {bill.Customer.name}</span>
                  )}
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
                          callBack={() => getBillData()}
                          payment={true}
                        />
                      ))}
                    {bill.billItems.length > 0 && (
                      <div className="mb-3 border-b pb-4 last:mb-0 last:border-0 last:pb-0">
                        <div className="mt-1 flex items-center justify-between gap-2">
                          <span>Tổng số tiền:</span>
                          <span>{formatCurecy(totalPrice + '')}</span>
                        </div>
                        <div className="mt-1 flex items-center justify-between gap-2">
                          <span>Thuế VAT(10%):</span>
                          <span>
                            {formatCurecy(Math.floor(totalPrice / 10) + '')}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center justify-between gap-2">
                          <span>Số tiền thanh toán:</span>
                          <span>{formatCurecy(totalPayment + '')}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center">
                    <Select
                      handleFunc={(e) => {
                        if (e.value)
                          handleAddBillItem({
                            label: e.label,
                            value: +e.value
                          })
                      }}
                      value={''}
                      options={options}
                      placeholder={'Thêm món'}
                      className="react-select-container z-[70] max-h-[400px] w-full"
                    />
                  </div>
                </div>
                <form className={classNames('mt-6')}>
                  <div
                    className={classNames(bill && bill.Customer && 'hidden')}
                  >
                    <h3 className="text-xl font-medium">
                      Thông tin khách hàng
                    </h3>
                    <div className="p-5">
                      <InputForm
                        {...register('phone')}
                        type="text"
                        title={'Số điện thoại'}
                        required
                        error={errors?.phone?.message}
                      />
                      <InputForm
                        {...register('name')}
                        title={'Họ và tên khách hàng'}
                        type="text"
                        required
                        error={errors?.name?.message}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium">
                      Hình thức thanh toán
                    </h3>
                    <div className="p-5">
                      <div className="flex justify-center">
                        <Select
                          handleFunc={(e) => {
                            setValue('customerPay', 0, {
                              shouldValidate: true
                            })
                            if (e) {
                              setValue('paymentMethod', e?.value + '', {
                                shouldValidate: true
                              })
                              if (e?.value === 'ATM') {
                                setValue('customerPay', totalPayment, {
                                  shouldValidate: true
                                })
                              }
                              return
                            }
                            setValue('paymentMethod', '', {
                              shouldValidate: true
                            })
                          }}
                          options={[
                            {
                              label: 'Tiền mặt',
                              value: 'CASH'
                            },
                            {
                              label: 'Thanh toán online',
                              value: 'ATM'
                            }
                          ]}
                          isClearable
                          placeholder={'Hình thức thanh toán'}
                          className="react-select-container z-[50] w-full"
                        />
                      </div>
                      {errors.paymentMethod && (
                        <p className="mt-2 text-danger">
                          {errors.paymentMethod.message}
                        </p>
                      )}
                    </div>
                    {watch('paymentMethod') === 'CASH' && (
                      <div className="px-5">
                        <InputForm
                          {...register('customerPay')}
                          type="text"
                          title={'Số tiền khách thanh toán'}
                          required
                          error={errors?.customerPay?.message}
                        />
                      </div>
                    )}
                  </div>
                  {watch('customerPay') > watch('paymentPrice') && (
                    <div className="mt-5">
                      <h3 className="text-xl font-medium">
                        Trả lại:{' '}
                        {formatCurecy(
                          watch('customerPay') - watch('paymentPrice') + ''
                        )}
                      </h3>
                    </div>
                  )}
                </form>
                <div className="mt-6 flex w-full justify-center">
                  <Button
                    color="success"
                    className="mr-2 !w-[150px] sm:w-auto"
                    size="lg"
                    iconName="Move"
                    outline
                    onClick={() => {
                      navigate(
                        BASE_TABLEFOOD_LINK +
                          '/' +
                          bill?.billTableOrder?.tableId
                      )
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
                    onClick={handleSubmit(onSubmit)}
                  >
                    Thanh toán
                  </Button>
                </div>
              </div>
            ) : (
              <div className="max-w-[500px] flex-1">
                <h2 className="mr-auto text-2xl font-bold">
                  Thông tin hóa đơn
                </h2>
                <div className="mt-7 grid grid-cols-1 gap-4 text-lg font-medium">
                  {bill.Customer && (
                    <span>Khách hàng: {bill.Customer.name}</span>
                  )}
                  {bill.Customer && <span>SĐT: {bill.Customer.phone}</span>}
                  <span>Ngày tạo: {formatDate(bill.createdAt)}</span>
                  <span>Ngày xuất: {formatDate(bill.exportTime)}</span>
                  <span>
                    Trạng thái:{' '}
                    {bill.status === 'CONFIRM'
                      ? `Đã thanh toán`
                      : `Chưa thanh toán`}
                  </span>
                  <span>
                    Hình thức thanh toán:{' '}
                    {bill.paymentMethod === 'ATM'
                      ? `Thanh toán online`
                      : `Tiền mặt`}
                  </span>
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
                          callBack={() => getBillData()}
                          payment={true}
                          isPayment={true}
                        />
                      ))}
                    {bill.billItems.length > 0 && (
                      <div className="mb-3 border-b pb-4 last:mb-0 last:border-0 last:pb-0">
                        <div className="mt-1 flex items-center justify-between gap-2">
                          <span>Tổng số tiền:</span>
                          <span>{formatCurecy(totalPrice + '')}</span>
                        </div>
                        <div className="mt-1 flex items-center justify-between gap-2">
                          <span>Thuế VAT(10%):</span>
                          <span>
                            {formatCurecy(Math.floor(totalPrice / 10) + '')}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center justify-between gap-2">
                          <span>Số tiền thanh toán:</span>
                          <span>{formatCurecy(bill.paymentPrice + '')}</span>
                        </div>
                        <div className="mt-1 flex items-center justify-between gap-2">
                          <span>Khách thanh toán:</span>
                          <span>{formatCurecy(bill.customerPay)}</span>
                        </div>
                        <div className="mt-1 flex items-center justify-between gap-2">
                          <span>Trả lại:</span>
                          <span>{formatCurecy(bill.giveBack)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default BillDetail
