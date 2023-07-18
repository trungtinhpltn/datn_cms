import Button from 'components/Button'
import ListView, { ListViewCtx } from 'components/ListView'
import { QueryKey } from 'contants/query'
import { useGlobalContext } from 'contexts/global'
import type { IBillInfo } from 'models/bill'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { getApiUrl } from 'services'
import { formatCurecy, formatDate } from 'utils'
import { reactFormatter } from 'utils/tabulator-tables'

import FilterAction from './components/FilterAction'
import ShowStatus from './components/ShowStatus'

const MangermentBill = () => {
  const navigate = useNavigate()
  const { restaurantSelect } = useGlobalContext()

  const Action = ({ cell }: { cell?: Tabulator.CellComponent }) => (
    <div className="flex items-center justify-center gap-2">
      <Button
        color="primary"
        className="mr-2 w-[30px] sm:w-auto"
        iconName="Eye"
        size="sm"
        outline
        onClick={(e) => {
          e.stopPropagation()
          navigate('/quan-ly-hoa-don/' + (cell?.getData() as any)?.id)
        }}
      >
        Chi tiết
      </Button>
    </div>
  )

  useEffect(() => {
    const table = ListViewCtx?.getTable?.()
    if (table && restaurantSelect?.id) {
      table?.addFilter('restaurant_id', '=', restaurantSelect.id)
    }
  }, [restaurantSelect])

  return (
    <div className="mt-5">
      <ListView<IBillInfo>
        queryKey={QueryKey.MANA_BILL}
        title={`Quản lý hóa đơn`}
        defaultFilterObject={
          restaurantSelect ? { restaurant_id: restaurantSelect.id } : {}
        }
        apiUrl={getApiUrl(`/bill/getByQuery`)}
        showSearch={false}
        actions={<FilterAction />}
        columns={[
          {
            title: 'Mã hóa đơn',
            width: 150,
            responsive: 0,
            field: 'id',
            vertAlign: 'middle',
            hozAlign: 'left',
            headerHozAlign: 'left',
            download: false,
            headerSort: false,
            cssClass: '!inline-block'
          },
          {
            title: 'Ngày tạo',
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
            title: 'Ngày xuất',
            responsive: 0,
            field: 'exportTime',
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
            field: 'status',
            vertAlign: 'middle',
            headerSort: false,
            headerHozAlign: 'left',
            hozAlign: 'left',
            cssClass: '!inline-block',
            download: false,
            formatter: reactFormatter(<ShowStatus />)
          },
          {
            title: 'Tổng số tiền',
            responsive: 0,
            field: 'totalPrice',
            vertAlign: 'middle',
            headerSort: false,
            headerHozAlign: 'left',
            hozAlign: 'left',
            cssClass: '!inline-block',
            download: false,
            formatter: function (cell) {
              const value = cell.getValue()
              return formatCurecy(value)
            }
          },
          {
            title: 'Số tiền thanh toán',
            responsive: 0,
            field: 'paymentPrice',
            vertAlign: 'middle',
            headerSort: false,
            headerHozAlign: 'left',
            hozAlign: 'left',
            cssClass: '!inline-block',
            download: false,
            formatter: function (cell) {
              const value = cell.getValue()
              return formatCurecy(value)
            }
          },
          {
            title: 'Khách thanh toán',
            responsive: 0,
            field: 'customerPay',
            vertAlign: 'middle',
            headerSort: false,
            headerHozAlign: 'left',
            hozAlign: 'left',
            cssClass: '!inline-block',
            download: false,
            formatter: function (cell) {
              const value = cell.getValue()
              return formatCurecy(value)
            }
          },

          {
            title: 'Thao tác',
            width: 200,
            field: 'id',
            vertAlign: 'middle',
            download: false,
            headerHozAlign: 'left',
            formatter: reactFormatter(<Action />),
            headerSort: false
          }
        ]}
      />
    </div>
  )
}

export default MangermentBill
