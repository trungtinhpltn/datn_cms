import type { IListViewQuery } from 'components/ListView'
import { useListViewCtx } from 'components/ListView'
import Select from 'components/Select'
import useQueryParam from 'hooks/useQueryParams'
import { billStatusOptions } from 'models/bill'
import React from 'react'
import { removeFilterByFieldName } from 'utils/tabulator-tables'

const FilterAction = () => {
  const { table } = useListViewCtx()
  const [query] = useQueryParam<IListViewQuery>()
  return (
    <div className="w-56">
      <Select
        handleFunc={(e) => {
          console.log('e.value', e.value)
          e?.value
            ? table?.addFilter('status', '=', e?.value)
            : table && removeFilterByFieldName(table, 'status')
        }}
        defaultValue={billStatusOptions.find(
          (opt) => opt.value === query?.stautus
        )}
        options={billStatusOptions}
        placeholder={'Trạng thái'}
        isClearable
      />
    </div>
  )
}

export default FilterAction
