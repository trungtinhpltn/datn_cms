import type { AxiosResponse, Method } from 'axios'
import axios from 'axios'
import type { IInputProps } from 'components/Input'
import InputSearch from 'components/Input/InputSearch'
import type { QueryKey } from 'contants/query'
import { _t } from 'contexts/i18n'
import useQueryParam from 'hooks/useQueryParams'
import { first, isEmpty, pick } from 'lodash'
import type { Context, ReactNode } from 'react'
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { useQueryClient } from 'react-query'
import {
  convertFilterToObject,
  convertObjectToFilter,
  removeFilterByFieldName
} from 'utils/tabulator-tables'

import type { TListViewButtonOrDropdown } from './Buttons'
import ListViewButtons from './Buttons'
import ListViewDataTable from './DataTable'

export interface IListViewContextProps {
  table?: Tabulator
  props?: IListViewProps<any>
  setTable: (table: Tabulator) => void
}

export interface IExtraProps {
  getTable?: () => Tabulator | undefined
}

export const ListViewCtx: Context<IListViewContextProps> & IExtraProps =
  createContext<IListViewContextProps>({
    setTable: function (): void {
      throw new Error('Function not implemented.')
    }
  })

export const useListViewCtx = () => useContext(ListViewCtx)

export interface IListColumn<T>
  extends Omit<Tabulator.ColumnDefinition, 'field'> {
  field?: keyof T
}

export interface IListViewProps<T> {
  apiUrl: string
  buttons?: TListViewButtonOrDropdown[]
  actions?: ReactNode
  search?: ReactNode | IInputProps
  headerComponent?: ReactNode
  columns: IListColumn<T>[]
  title?: string
  customConfigOptions?: Tabulator.Options
  queryKey: QueryKey
  defaultFilterObject?: any
  autoGenerateIndex?: boolean
  showSearch?: boolean
}

export interface IListViewQuery extends Record<string, any> {
  page?: number
  size?: number
  sort?: string
  q?: string
}

export default function ListView<T extends Record<string, any>>(
  props: IListViewProps<T>
) {
  const {
    apiUrl,
    columns,
    title,
    buttons,
    actions,
    search,
    headerComponent,
    autoGenerateIndex,
    defaultFilterObject,
    queryKey,
    showSearch = true
  } = props
  const [table, setTable] = useState<Tabulator>()
  const [queryParams, setQueryParams] = useQueryParam<IListViewQuery>()
  const queryClient = useQueryClient()

  const getTable = () => table

  ListViewCtx.getTable = getTable
  // const page = 1
  // const size = 20
  // const sort = undefined
  // const filters = undefined

  const page = useMemo<number>(() => {
    return queryParams?.page || 1
  }, [queryParams?.page])

  const size = useMemo<number>(() => {
    return queryParams?.size || 10
  }, [queryParams?.size])

  const sort = useMemo<Tabulator.Sorter[]>(() => {
    const [column, dir] = queryParams?.sort?.split(':') || []
    return [
      {
        column,
        dir: dir as Tabulator.SortDirection
      }
    ]
  }, [queryParams?.sort])

  // const filters = useMemo<Tabulator.Filter[]>(
  //   () =>
  //     convertObjectToFilter(queryParams, { ignores: ['page', 'size', 'sort'] }),
  //   [queryParams]
  // )

  const filters = useMemo<Tabulator.Filter[]>(
    () =>
      convertObjectToFilter(
        { ...queryParams, ...defaultFilterObject },
        { ignores: ['page', 'size', 'sort'] }
      ),
    [defaultFilterObject, queryParams]
  )

  const debounceRef = useRef<any>()
  useEffect(() => {
    return () => clearTimeout(debounceRef.current)
  }, [])

  const indexFormatter = (cell: any) => {
    const page = cell.getTable().getPage()
    const size = cell.getTable().getPageSize()
    const pos = cell.getRow().getPosition(true) + 1
    return Math.max((page || 0) - 1, 0) * size + pos
  }

  return (
    <ListViewCtx.Provider value={{ table, setTable, props }}>
      <div className="intro-y mt-3 flex flex-col items-center sm:flex-row">
        {title && <h2 className="mr-auto text-lg font-medium">{title}</h2>}
        <div className="mt-4 flex w-full sm:mt-0 sm:w-auto">
          {buttons && <ListViewButtons buttons={buttons} />}
        </div>
      </div>
      {/* BEGIN: HTML Table Data */}
      <div className="intro-y box mt-5 p-5">
        <div className="flex w-full items-center justify-center">
          {headerComponent}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end xl:items-start">
          {showSearch && (
            <div className="flex-1">
              {/* <ListViewFilter /> */}
              {React.isValidElement(search)
                ? search
                : typeof search === 'object' && (
                    <InputSearch
                      type="text"
                      className="form-control"
                      defaultValue={queryParams?.q || ''}
                      placeholder="Tìm kiếm"
                      onChange={(e) => {
                        clearTimeout(debounceRef.current)
                        debounceRef.current = setTimeout(() => {
                          setQueryParams((queryParams) => ({
                            ...queryParams,
                            q: e.target.value
                          }))
                          e.target.value
                            ? table?.addFilter('q', '=', e.target.value)
                            : table && removeFilterByFieldName(table, 'q')
                        }, 1000)
                      }}
                      {...((search as any) || {})}
                    />
                  )}
            </div>
          )}
          <div>
            {/* <ListViewActions /> */}
            {actions}
          </div>
        </div>
        <div className="scrollbar-hidden overflow-x-auto">
          <ListViewDataTable
            config={{
              ...{
                ajaxURL: apiUrl,
                async ajaxRequestFunc(
                  url,
                  config: { method: Method; headers: Record<string, string> },
                  params: {
                    page: number
                    size: number
                    sorters: Tabulator.SorterFromTable[]
                    filters: Tabulator.Filter[]
                  }
                ) {
                  // 1. PREPARE URL
                  const { page, size, sorters, filters } = params
                  const convertedFilters = convertFilterToObject(filters)
                  const convertedParams = {
                    page: page,
                    size: size,
                    sort: sorters.length
                      ? `${sorters[0].field}:${sorters[0].dir}`
                      : undefined,
                    ...convertedFilters
                  }
                  return queryClient.fetchQuery(
                    [queryKey, convertedParams],
                    async () =>
                      axios({
                        url,
                        method: config.method,
                        params: convertedParams
                      }),
                    {
                      retry: 3,
                      retryDelay: 1000,
                      staleTime: 1000 // stale time is 1 seconds
                    }
                  )
                },
                ajaxResponse: function (
                  url: string,
                  params: any,
                  response: AxiosResponse<any>
                ) {
                  return {
                    data: response?.data?.data?.data,
                    last_page: Math.ceil(
                      response.data.data.total / response.config.params.size
                    )
                  }
                },
                columns: (autoGenerateIndex
                  ? [
                      {
                        title: 'STT',
                        responsive: 0,
                        vertAlign: 'middle',
                        hozAlign: 'left',
                        headerHozAlign: 'left',
                        width: 90,
                        download: false,
                        headerSort: false,
                        frozen: true,
                        formatter: indexFormatter
                      },
                      ...columns
                    ]
                  : columns) as Tabulator.ColumnDefinition[],
                placeholder: `${_t('tabulator.placeholder')}`,
                initialFilter: filters,
                paginationInitialPage: page,
                paginationSize: size,
                initialSort: sort,
                cellClick: function (e, cell) {
                  // console.log({ e, cell })
                  // console.log(cell.getValue())
                },

                dataSorting: function (sorters) {
                  const sorter: any = first(sorters)
                  sorter &&
                    setQueryParams((queryParams) => ({
                      ...queryParams,
                      sort: `${sorter?.field || sorter?.column?.field}:${
                        sorter.dir
                      }`
                    }))
                },
                pageLoaded(pageno) {
                  setQueryParams((qp) => {
                    const newQuery: IListViewQuery = {
                      ...qp,
                      page: pageno
                    }
                    if (pageno === 1) {
                      delete newQuery.page
                    }
                    return newQuery
                  })
                },
                dataFiltered: function (filters, rows) {
                  const objectFilter = convertFilterToObject(filters)
                  setQueryParams((queryParams) => {
                    if (isEmpty(objectFilter)) {
                      return pick(queryParams, ['page', 'size', 'sort'])
                    }
                    return {
                      ...pick(queryParams, ['page', 'size', 'sort']),
                      ...objectFilter
                    }
                  })
                }
              },
              ...props.customConfigOptions
            }}
          />
        </div>
      </div>
      {/* END: HTML Table Data */}
    </ListViewCtx.Provider>
  )
}
