/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import type { IListViewQuery } from 'components/ListView'
import LoadingComponent from 'components/Loading/LoadingComponent'
import Select from 'components/Select'
import { Month } from 'contants'
import { useGlobalContext } from 'contexts/global'
import useQueryParam from 'hooks/useQueryParams'
import type { IHisShift } from 'models/shift'
import React, { useCallback, useEffect, useState } from 'react'
import { getHisShiftByRestaurant } from 'services/shift.service'
import { toastError } from 'utils/toast'

import { SHIFT_TIME } from './ca-nhan'
import HisShift from './components/HisShift'

const ManagermentShift = () => {
  const { restaurantSelect } = useGlobalContext()
  const [listHisShift, setListHisShift] = useState<IHisShift[]>([])
  const [monthSelect, setMonthSelect] = useState(new Date().getMonth() + 1)
  const [daySelect, setDaySelect] = useState<any>('')
  const [dayFilter, setDayFilter] = useState<any[]>([])
  const [queryParams, setQueryParams] = useQueryParam<IListViewQuery>()
  const [loading, setLoading] = useState(false)

  const getData = useCallback(async () => {
    if (!restaurantSelect?.id) return
    if (!daySelect) return
    setLoading(true)
    try {
      const currentYear = new Date().getFullYear()
      const dateS = daySelect.value.split('-')

      getHisShiftByRestaurant({
        year: currentYear,
        start: dateS?.[0],
        end: dateS?.[1],
        restaurant_id: restaurantSelect?.id
      }).then((res) => {
        setListHisShift(res)
      })
    } catch (error: any) {
      toastError(error.message)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }
  }, [restaurantSelect?.id, daySelect])

  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    if (queryParams && queryParams.restaurant_id) return
    if (restaurantSelect?.id) {
      setQueryParams((queryParams) => ({
        ...queryParams,
        restaurant_id: restaurantSelect?.id
      }))
    }
  }, [restaurantSelect, setQueryParams, queryParams])

  const optionsByWeekFunc = useCallback(() => {
    const options: any[] = []
    const date = new Date(2023, monthSelect, 0)
    const num = date.getDate() - date.getDay()
    let i = 0
    let loop = true
    do {
      const lastNum = num + 7 - 7 * i
      const firstNum = lastNum - 6
      const firstDay = new Date(
        new Date(2023, monthSelect, 0).setDate(firstNum)
      )
      const lastDay = new Date(new Date(2023, monthSelect, 0).setDate(lastNum))
      const option =
        `00${firstDay.getDate()}`.slice(-2) +
        `/` +
        `00${firstDay.getMonth() + 1}`.slice(-2) +
        ` - ` +
        `00${lastDay.getDate()}`.slice(-2) +
        `/` +
        `00${lastDay.getMonth() + 1}`.slice(-2)

      firstDay.getMonth() + 1 <= monthSelect &&
        firstDay.getFullYear() <= date.getFullYear() &&
        options.push({
          label: option,
          value: `${firstDay?.toDateString()}-${lastDay?.toDateString()}`
        })
      firstDay.getMonth() + 1 === 12 &&
        monthSelect === 1 &&
        options.push({
          label: option,
          value: `${firstDay?.toDateString()}-${lastDay?.toDateString()}`
        })
      i++
      if (
        new Date().getTime() <= lastDay.getTime() &&
        new Date().getTime() >= firstDay.getTime()
      ) {
        setDaySelect({
          label: option,
          value: `${firstDay?.toDateString()}-${lastDay?.toDateString()}`
        })
      }
      const month = firstDay.getMonth() > 0 ? firstDay.getMonth() + 1 : 12

      if (month < monthSelect) {
        loop = false
      }
      if (
        month === 12 &&
        firstDay.getFullYear() === 2023 &&
        monthSelect === 2
      ) {
        loop = false
      }
      if (firstDay.getFullYear() < 2023 && monthSelect === 1) {
        loop = false
      }
    } while (loop && i <= 7)
    if (monthSelect !== new Date().getMonth() + 1) {
      setDaySelect(options?.[0])
    }
    setDayFilter(options)
  }, [monthSelect])

  useEffect(() => {
    optionsByWeekFunc()
  }, [optionsByWeekFunc])

  return (
    <div className="mt-5">
      <div className="mb-6">
        <h2 className="mr-auto text-2xl font-bold">Quản lý ca làm việc</h2>
        <div className="mt-4">
          <p>
            Sáng: <span className="font-medium">Từ 8h:00 - 13h:00</span>
          </p>
          <p>
            Chiều: <span className="font-medium">Từ 13h:00 - 18h:00</span>
          </p>
          <p>
            Tối: <span className="font-medium">Từ 18h:00 - 22h:00</span>
          </p>
        </div>
      </div>
      {loading ? (
        <LoadingComponent show />
      ) : (
        <div className="grid grid-cols-1 border">
          <div className="border-b">
            <div className="grid max-w-[1000px] grid-cols-3 gap-4">
              <div className="flex items-center border-r p-3 text-lg font-medium">
                <div className="flex w-full items-center gap-4">
                  <span>Ngày: </span>
                  <Select
                    handleFunc={(e) => {
                      setDaySelect(e)
                    }}
                    value={daySelect}
                    options={dayFilter}
                    placeholder={'Ngày'}
                    className="react-select-container z-[70] max-h-[400px] w-full"
                  />
                </div>
              </div>
              <div className="flex items-center border-r p-3 text-lg font-medium">
                <div className="flex w-full items-center gap-4">
                  <span>Tháng: </span>
                  <Select
                    handleFunc={(e) => {
                      setMonthSelect(+e.value)
                    }}
                    value={
                      Month?.find((item) => item.value === monthSelect) ||
                      Month?.[0]
                    }
                    options={Month}
                    placeholder={'Tuần'}
                    className="react-select-container z-[70] max-h-[400px] w-full"
                  />
                </div>
              </div>
              <div className="flex items-center border-r p-3 text-lg font-medium">
                <div className="flex w-full items-center gap-4">
                  <span>Năm: </span>
                  <Select
                    handleFunc={() => {}}
                    value={{
                      label: '2023',
                      value: '2023'
                    }}
                    options={[
                      {
                        label: '2023',
                        value: '2023'
                      }
                    ]}
                    placeholder={'Tuần'}
                    className="react-select-container z-[70] max-h-[400px] w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 border-b">
            <div className="flex w-[150px] items-center border-r p-3 text-lg font-medium" />
            <div className="grid flex-1 shrink-0 grid-cols-8">
              {SHIFT_TIME.map((day) => (
                <div
                  className="border-r py-3 text-center last:border-none"
                  key={day?.key}
                >
                  <span className="text-lg font-medium">{day?.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1">
            {listHisShift?.length > 0 ? (
              listHisShift?.map((item) => (
                <HisShift
                  key={`ls-em-${item?.employeeId}`}
                  item={item}
                  callback={() => getData()}
                />
              ))
            ) : (
              <p className="p-3 text-center text-lg font-medium">
                Không có dữ liệu{' '}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ManagermentShift
