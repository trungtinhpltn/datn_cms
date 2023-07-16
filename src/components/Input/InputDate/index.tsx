import 'react-datetime/css/react-datetime.css'

import classNames from 'classnames'
import Datetime from 'react-datetime'
import type { FieldValues } from 'react-hook-form'
import { Controller, useFormContext } from 'react-hook-form'

import type { IInputProps } from '..'

export interface IInputDateProps<T extends FieldValues> extends IInputProps {
  error: string | undefined
}

export default function InputDate<T extends FieldValues>(
  props: IInputDateProps<T>,
  ref?: any
) {
  const { name, error, readOnly, ...rest } = props
  const { control } = useFormContext()

  return (
    <div className={`flex flex-col`}>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Datetime
            dateFormat={false}
            onChange={(e) => {
              onChange(e.toLocaleString())
            }}
            className={classNames(readOnly && 'datetime-disable')}
          />
        )}
        name={name || ''}
        control={control}
        {...rest}
      />
      <p className={`mt-1 text-start text-sm italic text-red-500`}>{error}</p>
    </div>
  )
}
