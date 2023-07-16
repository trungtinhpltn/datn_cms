import classNames from 'classnames'
import { useState } from 'react'
import type { FieldValues } from 'react-hook-form'

import type { IInputProps } from '..'
import Input from '..'

export interface IInputFormProps<T extends FieldValues> extends IInputProps {
  wrapperClassname?: string
  options: Array<T>
  register: object
}

export default function InputCheckBox<T extends FieldValues>(
  props: IInputFormProps<T>,
  ref?: any
) {
  const { wrapperClassname, register, options, title, ...rest } = props
  const [checkedValue, setCheckedValue] = useState('0')

  return (
    <div className={classNames('input-form', wrapperClassname)}>
      <h2 className="mb-3">{title}</h2>
      <label>
        {options.map((item, index) => (
          <div className="pl-2" key={item?.value}>
            <div className="form-check mt-2">
              <Input
                className="form-check-input h-5 w-5 rounded-full"
                id={item.value}
                value={item.value}
                defaultChecked={item.checked}
                {...register}
                {...ref}
                {...rest}
                onChange={() => setCheckedValue(item.value)}
              />
              <label className="form-check-label" htmlFor={item.value}>
                {item.title}
              </label>
            </div>
            {checkedValue === item.value && options[index]?.children}
          </div>
        ))}
      </label>
    </div>
  )
}
