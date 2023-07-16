import type { IListViewQuery } from 'components/ListView'
import { useListViewCtx } from 'components/ListView'
import Select from 'components/Select'
import useQueryParam from 'hooks/useQueryParams'
import { ActiveOptions } from 'models/restaurant'
import { removeFilterByFieldName } from 'utils/tabulator-tables'

const FilterAction = () => {
  const { table } = useListViewCtx()
  const [query] = useQueryParam<IListViewQuery>()
  return (
    <div className="w-56">
      <Select
        handleFunc={(e) => {
          e?.value
            ? table?.addFilter('active', '=', e?.value)
            : table && removeFilterByFieldName(table, 'active')
        }}
        defaultValue={ActiveOptions.find((opt) => opt.value === query?.active)}
        options={ActiveOptions}
        placeholder={'Trạng thái'}
        isClearable
      />
    </div>
  )
}
export default FilterAction
