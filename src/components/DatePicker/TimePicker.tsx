import classNames from 'classnames'
import Icon from 'components/Icon'
import useOnClickOutside from 'hooks/useOnClickOutside'
import React, { useEffect, useRef, useState } from 'react'

interface TimePickerProps {
  config?: string
  format?: '12' | '24'
  placementPopper?: string
  val?: string
  defaultValue: string
  className: string
}

const postionObj = {
  start: 'left-0',
  end: 'right-0',
  top: 'bottom-[calc(100%+4px)]',
  bottom: 'top-[calc(100%+4px)]'
}

export default function TimePickerInput(props: TimePickerProps) {
  const arrayTimeType = ['AM', 'PM']
  const {
    className,
    config,
    format = '24',
    placementPopper = 'start-bottom',
    defaultValue
  } = props
  const [inputVal, setInputVal] = useState<string[]>(
    defaultValue.split(':') || (config || 'hh:mm:ss').split(':').map(() => '00')
  )
  const [timeTypeIndex, setTimeTypeIndex] = useState(0)
  const [showPopper, setShowPopper] = useState(false)

  const popperPosition = () => {
    const arr = placementPopper.split('-')
    return arr.reduce((pre, current) => {
      return pre + ' ' + postionObj[current as keyof typeof postionObj]
    }, '')
  }
  // helper func
  const modifyTimeValue = (value: number) =>
    value < 10 ? `0${value}` : `${value}`
  // render func
  const renderTimeType = () => {
    return (
      <div
        className="min-w-[23px] cursor-pointer text-sm font-semibold"
        onClick={(e) => {
          e.preventDefault()
          setTimeTypeIndex(timeTypeIndex + 1)
        }}
      >
        {arrayTimeType[timeTypeIndex % 2]}
      </div>
    )
  }
  const renderSelect = (inputValIndex: number) => {
    let length = 0
    const isRenderHour12 = inputValIndex === 0 && format === '12'
    const isRenderHour24 = inputValIndex === 0 && format === '24'
    const isRenderMinuteOrSecond = inputValIndex !== 0

    if (isRenderHour12) {
      length = 12
    }
    if (isRenderHour24) {
      length = 23
    }
    if (isRenderMinuteOrSecond) {
      length = 59
    }

    return Array.from(Array(length + 1).keys()).map((item) => (
      <li
        key={item}
        className={` h-[28px] w-full min-w-[48px] rounded text-center leading-[28px] hover:bg-slate-100 ${
          parseInt(inputVal[inputValIndex]) === item && 'bg-blue-100'
        }`}
        onClick={(e) => handleChoiceValue(e, item, inputValIndex)}
      >
        {modifyTimeValue(item)}
      </li>
    ))
  }
  const renderPopper = () => {
    return (
      <div
        className={`absolute ${popperPosition()} !ml-0 rounded-md border bg-white p-2 shadow-lg`}
      >
        <div className="flex min-w-[120px] justify-between space-x-1">
          {inputVal.map((item, index) => (
            <ul
              id={`${index}`}
              key={index}
              className="scrollbar-hidden h-[196px] w-full overflow-y-auto overflow-x-hidden border-r pr-1 last:border-r-0 last:pr-0"
            >
              {renderSelect(index)}
              <li className="pointer-events-none h-[168px] w-full"></li>
            </ul>
          ))}
        </div>
        <div className="mt-1 flex h-10 items-center justify-between border-t">
          <p
            className="text-sm text-primary"
            onClick={(e) => setCurrentTime(e)}
          >
            Now
          </p>
          <button
            className="rounded !bg-primary p-1 px-2 text-sm text-white"
            onClick={(e) => saveTime(e)}
          >
            Lưu
          </button>
        </div>
      </div>
    )
  }
  // handle func
  const handleChoiceValue = (
    event: React.MouseEvent,
    value: number,
    inputValIndex: number
  ) => {
    if (event.target instanceof Element) {
      const ul = event.target.closest('ul')
      ul?.scrollTo({
        behavior: 'smooth',
        top: 28 * value
      })
      inputVal[inputValIndex] = modifyTimeValue(value)
      setInputVal([...inputVal])
    }
  }
  const setCurrentTime = (event: React.MouseEvent) => {
    event.stopPropagation()
    const date = new Date()
    let hour = date.getHours()
    const minute = date.getMinutes()
    const seccond = date.getSeconds()
    if (hour >= 12 && format === '12') {
      hour = hour - 12
      setTimeTypeIndex(1)
    }
    const newInputvalue = [
      modifyTimeValue(hour),
      modifyTimeValue(minute),
      modifyTimeValue(seccond)
    ]
    setInputVal(newInputvalue.slice(0, inputVal.length))
    setShowPopper(false)
  }
  const handleShowPoper = () => {
    setShowPopper(true)
  }
  const saveTime = (event: React.MouseEvent) => {
    event.stopPropagation()
    setShowPopper(false)
    console.log(inputVal)
  }

  useEffect(() => {
    if (showPopper === true) {
      inputVal.forEach((item, index) => {
        const ul = document.querySelector(`ul#\\3${index}`)
        ul?.scrollTo({ top: 28 * parseInt(item) })
      })
    }
  }, [inputVal, showPopper])

  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, () => setShowPopper(false))

  return (
    <div
      ref={ref}
      className={classNames(
        'relative ml-auto flex w-fit cursor-pointer items-center justify-between space-x-[6px] rounded-md border px-2 py-1',
        className
      )}
      data-value={inputVal.join(':')}
      onClick={() => handleShowPoper()}
    >
      {/* input content */}
      <div className={`min-w-[${20 * inputVal.length}px]`}>
        {inputVal.join(':')}
      </div>
      {format === '12' && renderTimeType()}
      <Icon iconName="Clock" className="h-[14px] w-[14px]" />
      {/* popper */}
      {showPopper && renderPopper()}
    </div>
  )
}
