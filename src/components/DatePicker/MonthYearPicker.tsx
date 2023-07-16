import classNames from 'classnames'
import Icon from 'components/Icon'
import useOnClickOutside from 'hooks/useOnClickOutside'
import { range } from 'lodash'
import React, { useEffect, useMemo, useRef, useState } from 'react'

enum Type {
  Month = 0,
  Year = 1
}

interface MonthYearPickerProps {
  disableFuture?: boolean
  config?: string
  placementPopper?: string
  defaultValue?: string
  className?: string
  value?: string
  onChange?: (value: string) => void
}

const postionObj = {
  start: 'left-0',
  end: 'right-0',
  top: 'bottom-[calc(100%+4px)]',
  bottom: 'top-[calc(100%+4px)]'
}

export default function MonthYearPicker(props: MonthYearPickerProps) {
  const {
    disableFuture,
    className,
    placementPopper = 'start-bottom',
    defaultValue,
    onChange,
    value
  } = props
  const [inputVal, setInputVal] = useState<string | null>(
    value || defaultValue || null
  )
  const displayValue = useMemo(() => inputVal || '--/--', [inputVal])
  const [showPopper, setShowPopper] = useState(false)

  const popperPosition = () => {
    const arr = placementPopper.split('-')
    return arr.reduce((pre, current) => {
      return pre + ' ' + postionObj[current as keyof typeof postionObj]
    }, '')
  }
  // render func
  const renderSelect = (type: Type) => {
    const length = type === Type.Month ? 12 : 20
    return range(length).map((item) => {
      const value =
        type === Type.Month ? item + 1 : new Date().getFullYear() - item
      const selectedValue = inputVal && parseInt(inputVal.split('/')[type])
      const thisYear = new Date().getFullYear()
      const thisMonth = new Date().getMonth() + 1
      const selectedMonth = inputVal && inputVal.split('/')[0]
      const selectedYear = inputVal && inputVal.split('/')[1]
      return (
        <li
          key={item}
          className={classNames(
            `h-[28px] w-full min-w-[48px] rounded text-center leading-[28px] hover:bg-slate-100`,
            selectedValue === value && 'bg-blue-100',
            disableFuture &&
              type === Type.Month &&
              Number(selectedYear) >= thisYear &&
              value > thisMonth
              ? 'pointer-events-none opacity-50'
              : ''
          )}
          onClick={() => {
            const newVal: string[] = inputVal
              ? inputVal.split('/')
              : ['01', String(thisYear)]

            newVal[type] = String(value).padStart(2, '0')

            console.log(newVal)

            const thisInputValueInFuture =
              Number(newVal[Type.Month]) > thisMonth &&
              Number(newVal[Type.Year]) >= thisYear

            if (disableFuture && thisInputValueInFuture) {
              if (type === Type.Year) {
                newVal[Type.Month] = String(thisMonth).padStart(2, '0')
              }
              if (type === Type.Month) {
                newVal[Type.Year] = String(thisYear - 1)
              }
            }

            setInputVal(newVal.join('/'))
          }}
        >
          {type === Type.Month ? `Th. ${item + 1}` : value}
        </li>
      )
    })
  }
  const renderPopper = () => {
    return (
      <div
        className={`absolute ${popperPosition()} z-10 !ml-0 rounded-md border bg-white p-2 shadow-lg`}
      >
        <div className="flex min-w-[120px] justify-between space-x-1">
          <ul className="scrollbar-hidden h-[196px] w-full overflow-y-auto overflow-x-hidden border-r pr-1 last:border-r-0 last:pr-0">
            {renderSelect(Type.Month)}
          </ul>
          <ul className="scrollbar-hidden h-[196px] w-full overflow-y-auto overflow-x-hidden border-r pr-1 last:border-r-0 last:pr-0">
            {renderSelect(Type.Year)}
          </ul>
        </div>
        <div className="mt-1 flex h-10 items-center justify-end border-t">
          <button
            className="rounded !bg-primary p-1 px-2 text-sm text-white"
            onClick={(e) => onClickSaveTime(e)}
          >
            Đóng
          </button>
        </div>
      </div>
    )
  }
  const onClickSaveTime = (event: React.MouseEvent) => {
    event.stopPropagation()
    setShowPopper(false)
    console.log(inputVal)
  }

  useEffect(() => {
    // document.body.classList.toggle('overflow-hidden', showPopper)
  }, [showPopper])

  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, () => setShowPopper(false))

  useEffect(() => {
    if (!showPopper && onChange && inputVal) {
      onChange(inputVal)
    }
  }, [inputVal, onChange, showPopper])

  useEffect(() => {
    defaultValue && setInputVal(defaultValue)
  }, [defaultValue])

  return (
    <div
      ref={ref}
      className={classNames(
        'relative ml-auto flex w-fit cursor-pointer items-center justify-between space-x-[6px] rounded-md border px-2 py-1',
        showPopper && 'shadow-inner',
        className
      )}
      data-value={displayValue}
      onClick={() => setShowPopper(true)}
    >
      {/* input content */}
      <div className={`w-14`}>{displayValue}</div>
      <Icon iconName="Calendar" className="h-[14px] w-[14px]" />
      {/* popper */}
      {showPopper && renderPopper()}
    </div>
  )
}
