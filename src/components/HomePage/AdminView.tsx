import Button from 'components/Button'
import DateStatistic from 'components/DatePicker/DateStatistic'
import type { IListViewQuery } from 'components/ListView'
import LoadingComponent from 'components/Loading/LoadingComponent'
import { useGlobalContext } from 'contexts/global'
import dayjs from 'dayjs'
import useQueryParam from 'hooks/useQueryParams'
import type { DateTime } from 'litepicker/dist/types/datetime'
import { useCallback, useEffect, useState } from 'react'
import { getReport } from 'services/bill.service'
import { formatCurecy } from 'utils'

export default function AdminView() {
  const { restaurants } = useGlobalContext()
  const [from, setFrom] = useState<number>(dayjs().startOf('M').unix())
  const [to, setTo] = useState<number>(dayjs().endOf('M').unix())
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>([])
  const [queryParams, setQueryParams] = useQueryParam<IListViewQuery>()

  const getData = useCallback(async () => {
    if (!restaurants) return
    setLoading(true)
    const res = await Promise.all(
      restaurants?.map(async (resItem) => {
        const rs = await getReport({
          from,
          to,
          restaurant_id: resItem?.id
        })
        const total = rs?.reduce((p: any, next: any) => p + next?.totalPrice, 0)
        return { ...resItem, total: total }
      })
    )
    res.sort((a: any, b: any) => b.total - a.total)
    setData(res)
    setLoading(false)
  }, [from, to, restaurants])

  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    setFrom(dayjs().startOf('M').unix())
    setTo(dayjs().unix())
  }, [])

  const handleViewDetail = (id: number) => {
    setQueryParams((queryParams) => ({
      ...queryParams,
      restaurant_id: id
    }))
  }

  return (
    <>
      {loading ? (
        <div className="h-screen w-full">
          <LoadingComponent show />
        </div>
      ) : (
        <div className="relative">
          <div className="intro-y mt-8 flex items-center">
            <h1 className="mr-auto text-lg font-medium">Thống kê doanh thu</h1>
          </div>
          <div className="box relative mt-5 rounded p-8">
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
            <div className="flex flex-col">
              <div className="grid grid-cols-12 border">
                <div className="col-span-1 border-r p-2 text-lg font-medium">
                  STT
                </div>
                <div className="col-span-3 border-r p-2 text-lg font-medium">
                  Mã nhà hàng
                </div>
                <div className="col-span-3 border-r p-2 text-lg font-medium">
                  Tên nhà hàng
                </div>
                <div className="col-span-3 border-r p-2 text-lg font-medium">
                  Doanh thu
                </div>
                <div className="col-span-2 border-r p-2 text-lg font-medium"></div>
              </div>
              {data?.map((item: any, index: number) => (
                <div
                  className="grid grid-cols-12 border border-t-0"
                  key={`db-am-all-${item?.id}`}
                >
                  <div className="col-span-1 border-r p-2">{index + 1}</div>
                  <div className="col-span-3 border-r p-2">{item?.id}</div>
                  <div className="col-span-3 border-r p-2">{item?.name}</div>
                  <div className="col-span-3 border-r p-2">
                    {formatCurecy(item?.total)}
                  </div>
                  <div className="col-span-2 flex justify-center border-r p-2">
                    <Button
                      color="primary"
                      className="mr-2 w-[30px] sm:w-auto"
                      iconName="Eye"
                      size="sm"
                      outline
                      onClick={() => {
                        handleViewDetail(item?.id)
                      }}
                    >
                      Chi tiết
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
