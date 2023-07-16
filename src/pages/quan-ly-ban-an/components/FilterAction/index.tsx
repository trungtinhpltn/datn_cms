import type { IListViewQuery } from 'components/ListView'
import Select from 'components/Select'
import useQueryParam from 'hooks/useQueryParams'
import { tableStatus } from 'models/table-food'

const FilterAction = () => {
  const [queryParams, setQueryParams] = useQueryParam<IListViewQuery>()

  return (
    <div className="w-56">
      <Select
        handleFunc={(e) => {
          delete queryParams?.['status']
          e?.value
            ? setQueryParams({ ...queryParams, status: e?.value })
            : setQueryParams({ ...queryParams })
        }}
        defaultValue={tableStatus.find(
          (opt) => opt.value === queryParams?.status
        )}
        options={tableStatus}
        placeholder={'Trạng thái'}
        isClearable
      />
    </div>
  )
}
export default FilterAction
