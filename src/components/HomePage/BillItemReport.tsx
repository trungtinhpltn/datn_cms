import type { IListViewQuery } from 'components/ListView'
import useQueryParam from 'hooks/useQueryParams'
import React, { useCallback, useEffect, useState } from 'react'
import { getBillItemReport } from 'services/bill.service'
import { toastError } from 'utils/toast'

const BillItemReport = ({ from, to }: any) => {
  const [queryParams] = useQueryParam<IListViewQuery>()
  const [data, setData] = useState([])
  const getData = useCallback(async () => {
    if (!queryParams?.restaurant_id) return
    try {
      const res = await getBillItemReport({
        from,
        to,
        restaurant_id: queryParams?.restaurant_id
      })
      setData(res?.data)
    } catch (error: any) {
      toastError(error?.message)
    }
  }, [from, to, queryParams?.restaurant_id])

  useEffect(() => {
    getData()
  }, [getData])
  return (
    <div className="mt-4 flex flex-col">
      <div className="grid grid-cols-12 border">
        <div className="col-span-1 border-r p-2 text-lg font-medium">STT</div>
        <div className="col-span-3 border-r p-2 text-lg font-medium">
          Mã món ăn
        </div>
        <div className="col-span-4 border-r p-2 text-lg font-medium">
          Tên món ăn
        </div>
        <div className="col-span-4 border-r p-2 text-lg font-medium">
          Số lần chọn
        </div>
      </div>
      {data?.map((item: any, index: number) => (
        <div
          className="grid grid-cols-12 border border-t-0"
          key={`db-am-all-${item?.id}`}
        >
          <div className="col-span-1 border-r p-2">{index + 1}</div>
          <div className="col-span-3 border-r p-2">{item?.id}</div>
          <div className="col-span-4 border-r p-2">{item?.name}</div>
          <div className="col-span-4 border-r p-2">{item?.quantity}</div>
        </div>
      ))}
    </div>
  )
}

export default BillItemReport
