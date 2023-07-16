import DatePicker from 'components/DatePicker'
import type { IListViewQuery } from 'components/ListView'
import { ListViewCtx, useListViewCtx } from 'components/ListView'
import Select from 'components/Select'
import useQueryParam from 'hooks/useQueryParams'
import { ActiveOptions } from 'models/order'
import { removeFilterByFieldName } from 'utils/tabulator-tables'

const Action = () => {
  return (
    <DatePicker
      className="datepicker form-control block w-72"
      placeholder="Chọn thời gian"
      singleMode
      handleFunc={(value: any) => {
        const table = ListViewCtx?.getTable?.()
        if (value.date1) {
          table?.addFilter('date', '=', value.date1)
          return
        }
        table && removeFilterByFieldName(table, 'date')
      }}
    />
  )
}
const FilterAction = () => {
  const { table } = useListViewCtx()
  const [query] = useQueryParam<IListViewQuery>()
  return (
    <div className="flex flex-row gap-6">
      <div className="w-56">
        <Action />
      </div>
      <div className="w-56">
        <Select
          handleFunc={(e) => {
            e?.value
              ? table?.addFilter('status', '=', e?.value)
              : table && removeFilterByFieldName(table, 'status')
          }}
          defaultValue={ActiveOptions.find(
            (opt) => opt.value === query?.status
          )}
          options={ActiveOptions}
          placeholder={'Trạng thái'}
          isClearable
        />
      </div>
    </div>
  )
}
export default FilterAction
