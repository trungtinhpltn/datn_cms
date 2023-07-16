import ListView from 'components/ListView'
import { BASE_RESTAURANT_LINK } from 'contants/baseLink'
import { QueryKey } from 'contants/query'
import { useGlobalContext } from 'contexts/global'
import { usePopup } from 'contexts/popup'
import { useNavigate } from 'react-router'
import { getApiUrl } from 'services'
import { deleteRestaurantByid } from 'services/restaurant.service'
import { formatDate } from 'utils'
import { reactFormatter } from 'utils/tabulator-tables'
import { toastError, toastSuccess } from 'utils/toast'

import FieldAction from './components/FieldAction'

const ManagerRestaurant = () => {
  const { showPopupConfirm } = usePopup()
  const navigate = useNavigate()

  const { initRestaurant } = useGlobalContext()
  return (
    <div className="mt-5">
      <ListView
        queryKey={QueryKey.MANA_RESTAURANT}
        title={`Quản lý nhà hàng`}
        apiUrl={getApiUrl(`/restaurant`)}
        search={{
          placeholder: 'Nhập tìm kiếm'
        }}
        // actions={<FilterAction />}
        buttons={[
          {
            id: '1',
            type: 'button',
            title: 'Thêm nhà hàng',
            color: 'primary',
            className: 'shadow-sm mr-2',
            iconName: 'Plus',
            onClick: () => {
              navigate(BASE_RESTAURANT_LINK + `/create`)
            }
          }
        ]}
        autoGenerateIndex={true}
        columns={[
          {
            title: 'Tên nhà hàng',
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
            title: 'Địa chỉ',
            responsive: 0,
            field: 'addressDetail',
            vertAlign: 'middle',
            hozAlign: 'left',
            headerHozAlign: 'left',
            download: false,
            headerSort: false,
            cssClass: '!inline-block',
            frozen: true
          },
          {
            title: 'Quận/Huyện',
            responsive: 0,
            field: 'District.name',
            vertAlign: 'middle',
            hozAlign: 'left',
            headerHozAlign: 'left',
            download: false,
            headerSort: false,
            cssClass: '!inline-block',
            frozen: true
          },
          {
            title: 'Tỉnh',
            responsive: 0,
            field: 'Province.name',
            vertAlign: 'middle',
            hozAlign: 'left',
            headerHozAlign: 'left',
            download: false,
            headerSort: false,
            cssClass: '!inline-block',
            frozen: true
          },
          // {
          //   title: 'Trạng thái',
          //   responsive: 0,
          //   field: 'active',
          //   vertAlign: 'middle',
          //   headerSort: false,
          //   headerHozAlign: 'left',
          //   hozAlign: 'left',
          //   cssClass: '!inline-block',
          //   download: false,
          //   formatter: function (cell) {
          //     const value = cell.getValue()
          //     return value === true ? 'Hoạt động' : 'Không hoạt động'
          //   }
          // },
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
            title: 'Thao tác',
            width: 300,
            field: 'id',
            vertAlign: 'middle',
            download: false,
            headerHozAlign: 'left',
            formatter: reactFormatter(
              <FieldAction
                navigateLink={(id: string | number) =>
                  navigate(`${BASE_RESTAURANT_LINK}/${id}`)
                }
                showPopupConfirm={showPopupConfirm}
                deleteFn={async (id: number) => {
                  const res = await deleteRestaurantByid(id)
                  if (res?.statusCode === 0) {
                    initRestaurant()
                    toastSuccess('Thành công')
                    return
                  }
                  toastError('Đã có lỗi xảy ra. Vui lòng thử lại sau.')
                }}
              />
            ),
            headerSort: false
          }
        ]}
      />
    </div>
  )
}

export default ManagerRestaurant
