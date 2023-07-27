import classNames from 'classnames'
import Icon from 'components/Icon'
import InputSearch from 'components/Input/InputSearch'
import type { IListViewQuery } from 'components/ListView'
import ListViewButtons from 'components/ListView/Buttons'
import LoadingComponent from 'components/Loading/LoadingComponent'
import { BASE_TABLEFOOD_LINK } from 'contants/baseLink'
import { useGlobalContext } from 'contexts/global'
import { usePopup } from 'contexts/popup'
import useQueryParam from 'hooks/useQueryParams'
import { Eye } from 'lucide-react'
import type { ITableFood } from 'models/table-food'
import { tableFoodStatusToText } from 'models/table-food'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router'
import {
  deleteTableFood,
  getTableFoodByQuery
} from 'services/tablefood.service'
import { toastError, toastSuccess } from 'utils/toast'

import FilterAction from './components/FilterAction'

const ManagerTableFood = () => {
  const { showPopupConfirm } = usePopup()
  const debounceRef = useRef<any>()
  const { restaurantSelect } = useGlobalContext()
  const navigate = useNavigate()
  const [queryParams, setQueryParams] = useQueryParam<IListViewQuery>()
  const [listTableFood, setListTableFood] = useState<ITableFood[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    return () => clearTimeout(debounceRef.current)
  }, [])

  useEffect(() => {
    if (queryParams && queryParams.restaurant_id) return
    if (restaurantSelect?.id) {
      setQueryParams((queryParams) => ({
        ...queryParams,
        restaurant_id: restaurantSelect?.id
      }))
    }
  }, [restaurantSelect, setQueryParams, queryParams])

  const getData = useCallback(async () => {
    if (!queryParams) return
    if (!queryParams.restaurant_id) return
    setLoading(true)
    try {
      const res: any = await getTableFoodByQuery(
        new URLSearchParams(queryParams).toString()
      )
      setListTableFood(res?.data || [])
    } catch (error: any) {
      toastError(error.message || 'Đã có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }, [queryParams])

  useEffect(() => {
    getData()
  }, [getData])

  const updateTableFoodInfo = useMutation({
    mutationFn: (id: number) => deleteTableFood(id),
    onSuccess: () => {
      toastSuccess('Xóa bàn thành công.')
      getData()
    },
    onError: (err: any) => {
      toastError(err?.message)
    }
  })

  const handleDeleteTable = (id?: number) => {
    if (!id) return
    showPopupConfirm({
      title: 'Bạn có thật sự muốn xóa bàn này?',
      iconName: 'XCircle',
      classNameIcon: 'text-red-600',
      titleConfirm: 'Xóa',
      comfirmCallback: async ({ setShow }) => {
        updateTableFoodInfo.mutate(id)
        setShow(false)
      }
    })
  }

  return (
    <>
      {loading ? (
        <div className="h-screen w-full">
          <LoadingComponent show />
        </div>
      ) : (
        <div className="mt-5">
          <div className="intro-y mt-3 flex flex-col items-center sm:flex-row">
            <h2 className="mr-auto text-lg font-medium">{`Quản lý bàn ăn`}</h2>
            <div className="mt-4 flex w-full sm:mt-0 sm:w-auto">
              <ListViewButtons
                buttons={[
                  {
                    id: '1',
                    type: 'button',
                    title: 'Thêm bàn ăn',
                    color: 'primary',
                    className: 'shadow-sm mr-2',
                    iconName: 'Plus',
                    onClick: () => {
                      navigate(BASE_TABLEFOOD_LINK + `/create`)
                    }
                  }
                ]}
              />
            </div>
          </div>
          <div className="intro-y box mt-5 p-5">
            <div className="flex w-full items-center justify-center"></div>
            <div className="flex flex-col sm:flex-row sm:items-end xl:items-start">
              <div className="flex-1">
                <InputSearch
                  type="text"
                  className="form-control"
                  defaultValue={queryParams?.q || ''}
                  placeholder="Tìm kiếm"
                  onChange={(e) => {
                    clearTimeout(debounceRef.current)
                    debounceRef.current = setTimeout(() => {
                      delete queryParams?.['q']
                      e.target.value
                        ? setQueryParams({
                            ...queryParams,
                            q: e.target.value
                          })
                        : setQueryParams({ ...queryParams })
                    }, 1000)
                  }}
                />
              </div>
              <div>
                <FilterAction />
              </div>
            </div>
            <div className="mt-8 grid grid-cols-5 gap-6">
              {listTableFood?.length > 0 ? (
                listTableFood?.map((item) => (
                  <div
                    className="box shadow-lg"
                    key={`qlba-it-key-${item?.id}`}
                  >
                    <div
                      className={classNames(
                        'bg-secondary p-5 font-medium text-dark',
                        item.status === 'PENDING' && '!bg-pending text-white',
                        item.status === 'ACTIVE' && '!bg-success text-white'
                      )}
                    >
                      <div className="">
                        <div className="flex items-center">
                          Tên: {item?.name}
                        </div>
                        <div className="mt-2 flex items-center">
                          Mô tả: {item?.description}
                        </div>
                        {/* <div className="mt-2 flex items-center">
                      Giá đặt bàn: {formatCurecy(item?.prePaymentAmount + '')}
                    </div> */}
                        <div className="mt-2 flex items-center">
                          Trạng thái:{' '}
                          {item?.status && tableFoodStatusToText[item?.status]}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center border-t border-slate-200/60 p-5 font-medium dark:border-darkmode-400 lg:justify-end">
                      <div
                        className="mr-auto flex cursor-pointer items-center justify-center text-primary"
                        onClick={() =>
                          navigate(BASE_TABLEFOOD_LINK + '/' + item?.id)
                        }
                      >
                        <Eye size={20} />
                        <span className="relative top-[1px]">Chi tiết</span>
                      </div>
                      <div
                        className="mr-3 flex cursor-pointer items-center justify-center text-warning"
                        onClick={() => {
                          navigate(BASE_TABLEFOOD_LINK + `/edit/${item?.id}`)
                        }}
                      >
                        <Icon iconName="Edit" size={20} />
                        <span className="relative top-[2px]">Sửa</span>
                      </div>
                      <div
                        className="flex cursor-pointer items-center justify-center text-danger"
                        onClick={() => handleDeleteTable(item?.id)}
                      >
                        <Icon iconName="Trash" size={20} />
                        <span className="relative top-[2px]">Xóa</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="col-span-5 w-full text-center text-2xl font-semibold text-dark">
                  Chưa có thông tin bàn
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ManagerTableFood
