import Button from 'components/Button'
import type { IListViewQuery } from 'components/ListView'
import ListView, { ListViewCtx, useListViewCtx } from 'components/ListView'
import Select from 'components/Select'
import { QueryKey } from 'contants/query'
import { useGlobalContext } from 'contexts/global'
import { _t } from 'contexts/i18n'
import { usePopup } from 'contexts/popup'
import useQueryParam from 'hooks/useQueryParams'
import { type IEmployee, positionOptions } from 'models/employee'
import { useDeleteEmployee } from 'mutation/employee.mutation'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { getApiUrl } from 'services'
import { formatDate } from 'utils'
import {
  deleteRowAndReloadTable,
  reactFormatter,
  removeFilterByFieldName
} from 'utils/tabulator-tables'

const MangermentStaff = () => {
  const { restaurantSelect } = useGlobalContext()
  const navigate = useNavigate()
  const { showPopupConfirm } = usePopup()
  const deleteEmployeeMutation = useDeleteEmployee()

  const Action = ({ cell }: { cell?: Tabulator.CellComponent }) => (
    <div className="flex items-center justify-center gap-2">
      <Button
        color="warning"
        className="mr-2 w-[30px] sm:w-auto"
        iconName="Edit"
        size="sm"
        outline
        onClick={(e) => {
          e.stopPropagation()
          navigate('/quan-ly-nhan-vien/edit/' + (cell?.getData() as any)?.id)
        }}
      >
        {_t('action.button.edit')}
      </Button>
      <Button
        color="danger"
        className="mr-2 w-[30px] sm:w-auto"
        iconName="Trash"
        size="sm"
        outline
        onClick={async (e) => {
          e.stopPropagation()
          showPopupConfirm({
            title: 'Bạn có thật sự muốn xóa?',
            iconName: 'XCircle',
            classNameIcon: 'text-red-600',
            titleConfirm: 'Xóa',
            comfirmCallback: async ({ setShow }) => {
              const index = cell?.getRow()?.getIndex()
              const table = cell?.getTable()
              try {
                if (table) {
                  // deleteFn(+value)
                  await deleteEmployeeMutation.mutateAsync(cell?.getValue())
                  deleteRowAndReloadTable(table, index)
                }
              } catch (err) {
                console.error(err)
              } finally {
                setShow(false)
              }
            }
          })
        }}
      >
        {_t('action.button.delete')}
      </Button>
    </div>
  )

  const FilterAction = () => {
    const { table } = useListViewCtx()
    const [query] = useQueryParam<IListViewQuery>()
    return (
      <div className="w-56">
        <Select
          handleFunc={(e) => {
            e?.value
              ? table?.addFilter('position', '=', e?.value)
              : table && removeFilterByFieldName(table, 'position')
          }}
          defaultValue={positionOptions.find(
            (opt) => opt.value === query?.position
          )}
          options={positionOptions}
          placeholder={'Chức vụ'}
          isClearable
        />
      </div>
    )
  }

  useEffect(() => {
    const table = ListViewCtx?.getTable?.()
    if (table && restaurantSelect?.id) {
      table?.addFilter('restaurant_id', '=', restaurantSelect.id)
    }
  }, [restaurantSelect])

  return (
    <div className="mt-5">
      <ListView<IEmployee>
        queryKey={QueryKey.MANA_RESTAURANT}
        title={`Quản lý nhân viên`}
        apiUrl={getApiUrl(`/employee`)}
        search={{
          placeholder: 'Nhập tìm kiếm'
        }}
        defaultFilterObject={
          restaurantSelect ? { restaurant_id: restaurantSelect.id } : {}
        }
        actions={<FilterAction />}
        buttons={[
          {
            id: '1',
            type: 'button',
            title: 'Thêm mới',
            color: 'primary',
            className: 'shadow-sm mr-2',
            iconName: 'Plus',
            onClick: () => {
              navigate(`/quan-ly-nhan-vien/create`)
            }
          }
        ]}
        autoGenerateIndex={true}
        columns={[
          {
            title: 'Tên Nhân viên',
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
            title: 'Nơi làm việc',
            responsive: 0,
            field: 'Restaurant.name' as any,
            vertAlign: 'middle',
            hozAlign: 'left',
            headerHozAlign: 'left',
            download: false,
            headerSort: false,
            cssClass: '!inline-block'
          },
          {
            title: 'Chức vụ',
            responsive: 0,
            field: 'position',
            vertAlign: 'middle',
            hozAlign: 'left',
            headerHozAlign: 'left',
            download: false,
            headerSort: false,
            cssClass: '!inline-block',
            formatter(cell) {
              const dict: any = {
                quan_ly: 'Quản lý',
                nhan_vien: 'Nhân viên'
              }
              const value = cell.getValue()
              return dict?.[value as string] || '-'
            }
          },

          {
            title: 'Loại nhân viên',
            responsive: 0,
            field: 'type',
            vertAlign: 'middle',
            hozAlign: 'left',
            headerHozAlign: 'left',
            download: false,
            headerSort: false,
            cssClass: '!inline-block',
            formatter(cell) {
              const dict: any = {
                chinh_thuc: 'Chính thức',
                thu_viec: 'Thử việc'
              }
              const value = cell.getValue()
              return dict?.[value as string] || '-'
            }
          },
          {
            title: 'ID Nội bộ',
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
            title: 'Số điện thoại',
            responsive: 0,
            field: 'phone',
            vertAlign: 'middle',
            hozAlign: 'left',
            headerHozAlign: 'left',
            download: false,
            headerSort: false,
            cssClass: '!inline-block'
          },
          {
            title: 'Email',
            responsive: 0,
            field: 'email',
            vertAlign: 'middle',
            hozAlign: 'left',
            headerHozAlign: 'left',
            download: false,
            headerSort: false,
            cssClass: '!inline-block'
          },
          {
            title: 'Trạng thái',
            responsive: 0,
            field: 'active',
            vertAlign: 'middle',
            headerSort: false,
            headerHozAlign: 'left',
            hozAlign: 'left',
            cssClass: '!inline-block',
            download: false,
            formatter: function (cell) {
              const value = cell.getValue()
              return value ? 'Hoạt động' : 'Không hoạt động'
            }
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
            title: 'Thao tác',
            width: 300,
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

export default MangermentStaff
