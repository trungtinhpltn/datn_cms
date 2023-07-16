import ListView, { ListViewCtx } from 'components/ListView'
import { BASE_MENU_ITEM_LINK } from 'contants/baseLink'
import { QueryKey } from 'contants/query'
import { useGlobalContext } from 'contexts/global'
import { usePopup } from 'contexts/popup'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { getApiUrl } from 'services'
import { deleteMenuitemByid } from 'services/menu.service'
import { formatCurecy } from 'utils'
import { reactFormatter } from 'utils/tabulator-tables'
import { toastError, toastSuccess } from 'utils/toast'

import FieldAction from './components/FiledAction'
import ImageShow from './components/ImageShow'

const MangermentMenuItem = () => {
  const navigate = useNavigate()
  const { showPopupConfirm } = usePopup()

  const { restaurantSelect } = useGlobalContext()

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
          restaurantSelect?.id ? { restaurant_id: restaurantSelect?.id } : {}
        }
        queryKey={QueryKey.MANA_MENU_ITEM}
        title={`Quản lý thực đơn`}
        apiUrl={getApiUrl(`/menu-item`)}
        search={{
          placeholder: 'Nhập tìm kiếm'
        }}
        buttons={[
          {
            id: '1',
            type: 'button',
            title: 'Thêm món ăn',
            color: 'primary',
            className: 'shadow-sm mr-2',
            iconName: 'Plus',
            onClick: () => {
              navigate(BASE_MENU_ITEM_LINK + `/create`)
            }
          }
        ]}
        autoGenerateIndex={true}
        columns={[
          {
            title: 'Tên món',
            responsive: 0,
            field: 'name',
            vertAlign: 'middle',
            hozAlign: 'left',
            headerHozAlign: 'left',
            download: false,
            headerSort: false,
            cssClass: '!inline-block'
          },
          {
            title: 'Mô tả',
            responsive: 0,
            field: 'description',
            vertAlign: 'middle',
            hozAlign: 'left',
            headerHozAlign: 'left',
            download: false,
            headerSort: false,
            cssClass: '!inline-block'
          },
          {
            title: 'Giá',
            responsive: 0,
            field: 'price',
            vertAlign: 'middle',
            hozAlign: 'left',
            headerHozAlign: 'left',
            download: false,
            headerSort: false,
            cssClass: '!inline-block',
            formatter: function (cell) {
              const value = cell.getValue()
              return formatCurecy(value)
            }
          },
          {
            title: 'Giá khuyến mãi',
            responsive: 0,
            field: 'discountPrice',
            vertAlign: 'middle',
            hozAlign: 'left',
            headerHozAlign: 'left',
            download: false,
            headerSort: false,
            cssClass: '!inline-block',
            formatter: function (cell) {
              const value = cell.getValue()
              return formatCurecy(value)
            }
          },
          {
            title: 'Đơn vị tính',
            responsive: 0,
            field: 'MenuUnit.name',
            vertAlign: 'middle',
            hozAlign: 'left',
            headerHozAlign: 'left',
            download: false,
            headerSort: false,
            cssClass: '!inline-block'
          },
          {
            title: 'Phân loại',
            responsive: 0,
            field: 'Category.name',
            vertAlign: 'middle',
            hozAlign: 'left',
            headerHozAlign: 'left',
            download: false,
            headerSort: false,
            cssClass: '!inline-block'
          },
          {
            title: 'Hình ảnh',
            width: 160,
            field: 'image',
            vertAlign: 'middle',
            download: false,
            headerHozAlign: 'center',
            hozAlign: 'center',
            cssClass: 'justify-center',
            headerSort: false,
            formatter: reactFormatter(<ImageShow />)
          },
          {
            title: 'Thao tác',
            width: 300,
            field: 'id',
            vertAlign: 'middle',
            download: false,
            headerHozAlign: 'center',
            hozAlign: 'center',
            cssClass: 'justify-center',
            formatter: reactFormatter(
              <FieldAction
                navigateLink={(id: string | number) => {
                  navigate(BASE_MENU_ITEM_LINK + '/edit/' + id)
                }}
                showPopupConfirm={showPopupConfirm}
                deleteFn={async (id: number) => {
                  try {
                    await deleteMenuitemByid(id)
                    toastSuccess('Thành công')
                  } catch (error: any) {
                    toastError(
                      error?.message ||
                        'Đã có lỗi xảy ra. Vui lòng thử lại sau.'
                    )
                  }
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

export default MangermentMenuItem
