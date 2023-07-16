import classNames from 'classnames'
import { useEffect, useState } from 'react'

import MonthYearPicker from './MonthYearPicker'

interface MonthYearPickerRangeProps {
  defaultValue?: [string, string]
  disableFuture?: boolean
  onChange?: (val1: string, val2: string) => void
  checkValid?: (val1: string, val2: string) => string | null
}

const isGreater = (val1?: string, val2?: string) => {
  if (!val1 || !val2) {
    return false
  }
  const str1 = [...val1.split('/')].reverse().join('')
  const str2 = [...val2.split('/')].reverse().join('')
  return str1 > str2
}

export default function MonthYearRangePicker({
  defaultValue,
  disableFuture,
  onChange,
  checkValid
}: MonthYearPickerRangeProps) {
  const [value1, setValue1] = useState<string>()
  const [value2, setValue2] = useState<string>()
  const [errorMessage, setErrorMessage] = useState<string | null>()

  useEffect(() => {
    const greater = isGreater(value1, value2)
    if (greater) {
      setErrorMessage(greater ? 'Khoảng thời gian không hợp lệ' : null)
    }
    const invalidMessage =
      value1 && value2 && checkValid ? checkValid(value1, value2) : null
    if (invalidMessage) {
      setErrorMessage(invalidMessage)
    }

    if (value1 && value2 && !errorMessage && !invalidMessage) {
      onChange && onChange(value1, value2)
    }
  }, [checkValid, onChange, value1, value2, errorMessage])
  return (
    <div
      className={classNames(
        'relative flex items-center justify-center space-x-2 rounded border-[1px] border-slate-300 px-2',
        errorMessage ? '!border-red-500' : ''
      )}
    >
      {errorMessage && (
        <p className="absolute -bottom-1/2 right-0 text-xs text-red-600">
          {errorMessage}
        </p>
      )}
      <span className={classNames(errorMessage ? 'text-red-700' : '')}>Từ</span>
      <MonthYearPicker
        defaultValue={defaultValue?.[0]}
        disableFuture={disableFuture}
        value={value1}
        onChange={(val) => {
          setValue1(val)
        }}
      />
      <span className={classNames(errorMessage ? 'text-red-700' : '')}>
        đến
      </span>{' '}
      <MonthYearPicker
        defaultValue={defaultValue?.[1]}
        disableFuture={disableFuture}
        value={value2}
        onChange={(val) => {
          const greater = isGreater(value1, val)
          setErrorMessage(greater ? 'Khoảng thời gian không hợp lệ' : null)
          setValue2(val)
        }}
      />
    </div>
  )
}
