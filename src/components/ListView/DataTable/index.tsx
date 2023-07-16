import { rawLoadingSvg } from 'common/tabulator-tables.type'
import useQueryParam from 'hooks/useQueryParams'
import { useEffect, useRef } from 'react'
import Tabulator from 'tabulator-tables'

import type { IListViewQuery } from '..'
import { useListViewCtx } from '..'

export interface IListViewDataTableProps {
  config: Tabulator.Options
}

const defaultConfig: Tabulator.Options = {
  ajaxFiltering: true,
  ajaxLoaderLoading: rawLoadingSvg,
  ajaxSorting: true,
  layout: 'fitColumns',
  printAsHtml: true,
  printStyled: true,
  pagination: 'remote',
  paginationSize: 10,
  paginationSizeSelector: [10, 20, 30, 40, 50, 100],
  responsiveLayout: 'collapse'
}
const handleSelectSize = (element: HTMLSelectElement | null) => {
  element?.childNodes.forEach((op, index) => {
    if (index !== 0) {
      if (element.options[0].value === op.textContent) {
        element.options[0].remove()
        element.value = op.textContent
      }
    }
  })
}

function ListViewDataTable({ config }: IListViewDataTableProps) {
  const { setTable } = useListViewCtx()
  const ref = useRef<HTMLDivElement>(null)
  const [, setQueryParam] = useQueryParam<IListViewQuery>()

  const customPageSizeSelector = () => {
    const sizeSelect = document.querySelector<HTMLSelectElement>(
      '.tabulator-page-size'
    )

    handleSelectSize(sizeSelect)
    sizeSelect?.addEventListener('change', (e: any) => {
      e.preventDefault()
      handleSelectSize(sizeSelect)
      setQueryParam((q) => ({ ...q, size: e?.target?.value }))
    })
  }

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const table = new Tabulator(ref.current, {
      ...defaultConfig,
      ...config
    })

    setTable(table)

    customPageSizeSelector()
    return () => table.destroy()
  }, [])

  return <div ref={ref} className="table-report table-report--tabulator mt-5" />
}

export default ListViewDataTable
