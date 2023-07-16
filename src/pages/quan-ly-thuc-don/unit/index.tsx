import type { IListViewQuery } from 'components/ListView'
import ListView from 'components/ListView'
import { QueryKey } from 'contants/query'
import { usePopup } from 'contexts/popup'
import useQueryParam from 'hooks/useQueryParams'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getApiUrl } from 'services'
import { deleteMenuUnitByid } from 'services/menu.service'
import { formatDate } from 'utils'
import { reactFormatter } from 'utils/tabulator-tables'
import { toastError, toastSuccess } from 'utils/toast'

import FieldAction from './components/FiledAction'
import CreateMenuUnit from './create'
import EditMenuUnit from './edit'

const MenuUnit = () => {
  const [query] = useQueryParam<IListViewQuery>()
  const { showPopupConfirm } = usePopup()
  const [searchParams, setSearchParams] = useSearchParams()
  const [showPopupCreateUnit, setShowPopupCreateUnit] = useState(false)
  const [showPopupEditUnit, setShowPopupEditUnit] = useState(false)

  useEffect(() => {
    if (query?._edit) {
      return setShowPopupEditUnit(true)
    }
    document.body.style.overflow = 'auto'
  }, [query])

  return (
    <>
      <div className="mt-5">
        <ListView
          queryKey={QueryKey.MANA_MENU_UNIT}
          title={`Phân loại đơn vị tính`}
          apiUrl={getApiUrl(`/menu-unit`)}
          search={{
            placeholder: 'Nhập tìm kiếm'
          }}
          buttons={[
            {
              id: '1',
              type: 'button',
              title: 'Thêm phân loại',
              color: 'primary',
              className: 'shadow-sm mr-2',
              iconName: 'Plus',
              onClick: () => {
                setShowPopupCreateUnit(true)
                document.body.style.overflow = 'hidden'
              }
            }
          ]}
          autoGenerateIndex={true}
          columns={[
            {
              title: 'Tên đơn vị tính',
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
              title: 'Mô tả',
              responsive: 0,
              field: 'description',
              vertAlign: 'middle',
              hozAlign: 'left',
              headerHozAlign: 'left',
              download: false,
              headerSort: false,
              cssClass: '!inline-block',
              frozen: true
            },
            {
              title: 'Ngày tạo',
              width: 200,
              responsive: 0,
              field: 'createdAt',
              vertAlign: 'middle',
              hozAlign: 'left',
              download: false,
              cssClass: '!inline-block',
              headerHozAlign: 'left',
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
              headerHozAlign: 'center',
              hozAlign: 'center',
              cssClass: 'justify-center',
              formatter: reactFormatter(
                <FieldAction
                  navigateLink={(id: string | number) => {
                    searchParams.delete('_edit')
                    searchParams.append('_edit', id.toString())
                    setSearchParams(searchParams)
                  }}
                  showPopupConfirm={showPopupConfirm}
                  deleteFn={async (id: number) => {
                    try {
                      await deleteMenuUnitByid(id)
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
      {showPopupCreateUnit && (
        <CreateMenuUnit
          show={showPopupCreateUnit}
          closePopup={() => {
            setShowPopupCreateUnit(false)
          }}
        />
      )}
      {showPopupEditUnit && (
        <EditMenuUnit
          show={showPopupEditUnit}
          closePopup={() => {
            searchParams.delete('_edit')
            setSearchParams(searchParams)
            setShowPopupEditUnit(false)
          }}
        />
      )}
    </>
  )
}

export default MenuUnit
