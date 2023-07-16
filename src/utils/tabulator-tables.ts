import { ListViewCtx } from 'components/ListView'
import dayjs from 'dayjs'
import { omit } from 'lodash'
import type { FunctionComponentElement } from 'react'
import { cloneElement } from 'react'
import { createRoot } from 'react-dom/client'

export function reactFormatter(JSX: FunctionComponentElement<any>) {
  return function customFormatter(
    cell: any,
    formatterParams: any,
    onRendered: any
  ) {
    // cell - the cell component
    // formatterParams - parameters set for the column
    // onRendered - function to call when the formatter has been rendered
    const renderFn = function () {
      const cellEl = cell.getElement()
      if (cellEl) {
        const formatterCell = cellEl.querySelector('.formatterCell')
        if (formatterCell) {
          const CompWithMoreProps = cloneElement(JSX, { cell: cell })

          createRoot(cellEl.querySelector('.formatterCell')).render(
            CompWithMoreProps
          )
          // hydrateRoot(cellEl.querySelector('.formatterCell'), CompWithMoreProps)
          // createPortal(CompWithMoreProps, formatterCell)
        }
      }
    }
    onRendered(renderFn) // initial render only.
    setTimeout(function () {
      renderFn() // render every time cell value changed.
    }, 0)
    return '<div class="formatterCell"></div>'
  }
}

export const convertObjectToFilter = (
  query: any,
  options?: { ignores: string[] }
) =>
  Object.entries(omit(query, options?.ignores || [])).map((item) => {
    const [key, value] = item
    let field = key
    let type = '='
    if (key.includes('[') && key.includes(']')) {
      field = key.slice(0, key.indexOf('['))
      type = key.slice(key.indexOf('[') + 1, key.indexOf(']'))
    }
    return {
      field,
      type: type as Tabulator.FilterType,
      value
    }
  })

export const convertFilterToObject = (filters: Tabulator.Filter[]) => {
  return filters.reduce((result, item) => {
    const { field, type, value } = item
    const fieldWithType = `${field}${type !== '=' ? `[${type}]` : ''}`
    const newResult = { ...result, [fieldWithType]: value }
    return newResult
  }, {})
}

export function reloadTable(table?: Tabulator) {
  if (!table) {
    table = ListViewCtx?.getTable?.()
    table && reloadTable(table)
    return
  }
  table.setPage(table.getPage() || 'first')
}

export function deleteRowAndReloadTable(table: Tabulator, index: number) {
  table.deleteRow(index)
  const isEmpty = table.getDataCount() === 0
  if (isEmpty) {
    table.setPage('prev')
  } else {
    table && reloadTable(table)
  }
}

export function removeFilterByFieldName(table: Tabulator, name: string) {
  const allFilters = table.getFilters(true)
  allFilters.forEach((filter) => {
    if (filter.field !== name) {
      return
    }
    table.removeFilter(name, filter.type, filter.value)
  })
}

export function formatterDate(timestamp: number) {
  return dayjs.unix(timestamp).format('DD/MM/YYYY HH:mm')
}
