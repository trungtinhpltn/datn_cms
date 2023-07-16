import { Filter, Plus, Undo } from 'lucide-react'
import * as React from 'react'

import FilterItem from './FilterItem'

export interface IListViewFilterProps {}

export default function ListViewFilter(props: IListViewFilterProps) {
  return (
    <>
      <form
        id="tabulator-html-filter-form"
        className="gap-4 sm:mr-auto xl:flex"
      >
        <div className="flex flex-col gap-2">
          <FilterItem />
          <FilterItem />
          <FilterItem />
          <div className="mr-8 text-right">
            <button className="btn btn-secondary btn-sm w-auto">
              <Plus size={12} /> <span>Thêm điều kiện</span>
            </button>
          </div>
        </div>
        <div>
          <div className="mt-2 flex gap-2 xl:mt-0">
            <button
              id="tabulator-html-filter-go"
              type="button"
              className="btn btn-primary flex w-24 gap-1"
            >
              <Filter size={14} />
              <span>Lọc</span>
            </button>
            <button
              id="tabulator-html-filter-reset"
              type="button"
              className="btn btn-secondary flex w-24 gap-1"
            >
              <Undo size={14} />
              Reset
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
