import type { IListViewQuery } from 'components/ListView'
import ListView from 'components/ListView'
import { QueryKey } from 'contants/query'
import { usePopup } from 'contexts/popup'
import useQueryParam from 'hooks/useQueryParams'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getApiUrl } from 'services'
import { deleteMenuCategoryByid } from 'services/menu.service'
import { formatDate } from 'utils'
import { reactFormatter } from 'utils/tabulator-tables'
import { toastError, toastSuccess } from 'utils/toast'

import FieldAction from './components/FiledAction'
import CreateCategory from './create'
import EditCategory from './edit'

const MenuCategory = () => {
  const [query] = useQueryParam<IListViewQuery>()
  const { showPopupConfirm } = usePopup()
  const [searchParams, setSearchParams] = useSearchParams()
  const [showPopupCreateCategory, setShowPopupCreateCategory] = useState(false)
  const [showPopupEditCategory, setShowPopupEditCategory] = useState(false)

  useEffect(() => {
    if (query?._edit) {
      return setShowPopupEditCategory(true)
    }
    document.body.style.overflow = 'auto'
  }, [query])

  return (
    <>
      <div className="mt-5">
        <ListView
          queryKey={QueryKey.MANA_MENU_CATEGORY}
          title={`Phân loại đồ`}
          apiUrl={getApiUrl(`/menu-category`)}
          search={{
            placeholder: 'Nhập tìm kiếm'
          }}
          buttons={[
            {
              id: '1',
              type: 'button',
              title: 'Thêm loại đồ',
              color: 'primary',
              className: 'shadow-sm mr-2',
              iconName: 'Plus',
              onClick: () => {
                setShowPopupCreateCategory(true)
                document.body.style.overflow = 'hidden'
              }
            }
          ]}
          autoGenerateIndex={true}
          columns={[
            {
              title: 'Tên phân loại',
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
                      await deleteMenuCategoryByid(id)
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
      {showPopupCreateCategory && (
        <CreateCategory
          show={showPopupCreateCategory}
          closePopup={() => {
            setShowPopupCreateCategory(false)
          }}
        />
      )}
      {showPopupEditCategory && (
        <EditCategory
          show={showPopupEditCategory}
          closePopup={() => {
            searchParams.delete('_edit')
            setSearchParams(searchParams)
            setShowPopupEditCategory(false)
          }}
        />
      )}
    </>
  )
}

export default MenuCategory
