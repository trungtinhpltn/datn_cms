import DateStatistic from 'components/DatePicker/DateStatistic'
import LineChart from 'components/LineChart'
import type { IListViewQuery } from 'components/ListView'
import LoadingComponent from 'components/Loading/LoadingComponent'
import { useGlobalContext } from 'contexts/global'
import dayjs from 'dayjs'
import useQueryParam from 'hooks/useQueryParams'
import type { DateTime } from 'litepicker/dist/types/datetime'
import { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { getReport } from 'services/bill.service'
import { formatCurecy } from 'utils'

export default function Home() {
  const { restaurantSelect } = useGlobalContext()
  const [queryParams, setQueryParams] = useQueryParam<IListViewQuery>()

  const [from, setFrom] = useState<number>(dayjs().startOf('M').unix())
  const [to, setTo] = useState<number>(dayjs().endOf('M').unix())

  const { data, isLoading, isError } = useQuery({
    queryKey: ['report', { from, to }],
    enabled: !!from && !!to && !!restaurantSelect?.id,
    queryFn: () => {
      if (!from || !to || !restaurantSelect?.id) {
        return
      }
      return getReport({ from, to, restaurant_id: restaurantSelect?.id })
    }
  })

  useEffect(() => {
    if (queryParams && queryParams.restaurant_id) return
    if (restaurantSelect?.id) {
      setQueryParams((queryParams) => ({
        ...queryParams,
        restaurant_id: restaurantSelect?.id
      }))
    }
  }, [restaurantSelect, setQueryParams, queryParams])

  const dataObject = useMemo<Record<string, number>>(() => {
    const result: Record<string, number> = {}
    let start = (from || 0) * 1000
    const end = (to || 0) * 1000
    while (start && end && start < end) {
      result[dayjs(start).format('DD/MM')] = 0
      start += 86400000
    }
    if (data && data.length) {
      data.forEach((item: any) => {
        const key = dayjs(item.date * 1000).format('DD/MM')
        result[key] = item.totalPrice
      })
    }
    return result
  }, [from, to, data])

  const total = useMemo(() => {
    return data?.reduce((p: any, next: any) => p + next?.totalPrice, 0)
  }, [data])

  useEffect(() => {
    setFrom(dayjs().startOf('M').unix())
    setTo(dayjs().endOf('M').unix())
  }, [])

  return (
    <div className="relative">
      <div className="intro-y mt-8 flex items-center">
        <h1 className="mr-auto text-lg font-medium">Thống kê doanh thu</h1>
      </div>
      <div className="box relative mt-5 rounded p-8">
        <div>
          <div>
            <div className="flex w-full">
              <div className="mb-4 flex justify-end space-x-4">
                <DateStatistic
                  defaultValue={
                    from && to
                      ? `${dayjs(from * 1000).format('DD/MM/YYYY')} - ${dayjs(
                          to * 1000
                        ).format('DD/MM/YYYY')}`
                      : undefined
                  }
                  required
                  hideQuickPick
                  className="datepicker form-control block w-64"
                  placeholder="Chọn khoảng thời gian ..."
                  onApplyRange={({ from, to }) => {
                    const date1 = dayjs(from).startOf('D')
                    const date2 = dayjs(to).endOf('D')
                    setFrom(date1.unix())
                    setTo(date2.unix())
                  }}
                  customOptions={{
                    lockDaysFilter: (
                      date1: DateTime,
                      date2: DateTime,
                      pickedDates: [DateTime, DateTime]
                    ) => {
                      if (pickedDates.length) {
                        const startDate = pickedDates[0].getTime()
                        const minDate = startDate - 86400000 * 30
                        const maxDate = Math.min(
                          new Date().getTime(),
                          startDate + 86400000 * 30
                        )
                        return (
                          date1.getTime() < minDate || date1.getTime() > maxDate
                        )
                      }
                      return date1.getTime() > new Date().getTime()
                    }
                  }}
                />
              </div>
            </div>
            <div className="body relative">
              <div className="flex w-full">
                <h3 className="flex-1 text-lg font-medium">
                  Tổng doanh thu từ {dayjs(from * 1000).format('DD/MM')} đến{' '}
                  {dayjs(to * 1000).format('DD/MM')}: {formatCurecy(total)}
                </h3>
              </div>
              {isError && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/50 text-lg text-red-500">
                  <span className="rounded border-[1px] bg-white px-4 py-2">
                    Có lỗi xảy ra vui lòng thử lại sau
                  </span>
                </div>
              )}
              {isLoading ? (
                <div className="h-screen w-full">
                  <LoadingComponent show />
                </div>
              ) : (
                <LineChart
                  labels={[...Object.keys(dataObject)]}
                  datasets={[
                    {
                      label: 'Tổng số tiền ( Nghìn đồng)',
                      data: [...Object.values(dataObject)],
                      borderColor: 'rgb(53, 162, 235)',
                      backgroundColor: 'rgba(53, 162, 235, 0.5)',
                      fill: true,
                      lineTension: 0.5
                    }
                  ]}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
