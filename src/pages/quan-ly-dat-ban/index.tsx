import ListView, { ListViewCtx } from 'components/ListView'
import { BASE_ORDER } from 'contants/baseLink'
import { QueryKey } from 'contants/query'
import { useGlobalContext } from 'contexts/global'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { getApiUrl } from 'services'
import { formatDate, formatDateString } from 'utils'
import { reactFormatter } from 'utils/tabulator-tables'

import FieldAction from './components/FiledAction'
import FilterAction from './components/FilterAction'
import ShowStatus from './components/ShowStatus'

const MangermentOrder = () => {
  const { restaurantSelect } = useGlobalContext()
  const navigate = useNavigate()

  useEffect(() => {
    const table = ListViewCtx?.getTable?.()
    if (table && restaurantSelect?.id) {
      table?.addFilter('restaurant_id', '=', restaurantSelect.id)
    }
  }, [restaurantSelect])

  return (
    <div className="mt-5">
      <ListView
        defaultFilterObject={
          restaurantSelect ? { restaurant_id: restaurantSelect.id } : {}
        }
        queryKey={QueryKey.MANA_ORDER}
        title={`Quản lý đặt bàn`}
        actions={<FilterAction />}
        apiUrl={getApiUrl(`/order/getOrder`)}
        autoGenerateIndex={true}
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
          // {
          //   title: 'Trẻ em',
          //   width: 120,
          //   field: 'children',
          //   vertAlign: 'middle',
          //   headerHozAlign: 'left',
          //   hozAlign: 'left',
          //   download: false,
          //   cssClass: '!inline-block',
          //   headerSort: false
          // },
          // {
          //   title: 'Người lớn',
          //   width: 120,
          //   field: 'person',
          //   vertAlign: 'middle',
          //   headerHozAlign: 'left',
          //   hozAlign: 'left',
          //   download: false,
          //   cssClass: '!inline-block',
          //   headerSort: false
          // },
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
                navigateLink={(id: number | string) =>
                  navigate(BASE_ORDER + `/${id}`)
                }
              />
            ),
            headerSort: false
          }
        ]}
      />
    </div>
  )
}

export default MangermentOrder
