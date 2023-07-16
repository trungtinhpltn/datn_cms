import { Minus } from 'lucide-react'

export interface IFilterItemProps {}

export default function FilterItem(props: IFilterItemProps) {
  return (
    <div className="flex gap-2">
      <div className="items-center sm:flex">
        {/* <label className="w-12 flex-none xl:w-auto xl:flex-initial mr-2">
          Field
        </label> */}
        <select
          id="tabulator-html-filter-field"
          className="form-select mt-2 w-full sm:mt-0 sm:w-32 2xl:w-full"
        >
          <option value="name">Name</option>
          <option value="category">Category</option>
          <option value="remaining_stock">Remaining Stock</option>
        </select>
      </div>
      <div className="mt-2 items-center  sm:flex xl:mt-0">
        {/* <label className="w-12 flex-none xl:w-auto xl:flex-initial mr-2">
          Type
        </label> */}
        <select
          id="tabulator-html-filter-type"
          className="form-select mt-2 w-full sm:mt-0 sm:w-auto"
        >
          <option value="like">like</option>
          <option value="=">=</option>
          <option value="<">&lt;</option>
          <option value="<=">&lt;=</option>
          <option value=">">&gt;</option>
          <option value=">=">&gt;=</option>
          <option value="!=">!=</option>
        </select>
      </div>
      <div className="mt-2 items-center sm:flex xl:mt-0">
        {/* <label className="w-12 flex-none xl:w-auto xl:flex-initial mr-2">
          Value
        </label> */}
        <input
          type="text"
          className="form-control mt-2 sm:mt-0 sm:w-40 2xl:w-full"
          placeholder="Search..."
        />
      </div>

      <div className="flex items-center gap-1">
        <button className="btn btn-secondary btn-sm h-6 w-6 rounded-full p-0">
          <Minus size={12} />
        </button>
      </div>
    </div>
  )
}
