import React, { memo } from 'react'

interface InputTextProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  label?: string
  children?: any
  classNameInput?: string
  disabled?: boolean
  horizontal?: boolean
  classNameLabel?: string
  iconLabel?: JSX.Element
  required?: boolean
  placeholder?: string
  rows?: number
  value?: string
  readOnly?: boolean
  onChange?: any
}

const InputArea = ({
  rows = 1,
  label,
  className,
  classNameInput,
  children,
  horizontal = false,
  classNameLabel,
  iconLabel,
  required,
  value = '',
  readOnly = false,
  onChange
}: InputTextProps) => {
  return (
    <div
      className={`w-full ${
        horizontal ? 'mb-2 flex gap-2' : 'mt-2'
      } ${className}`}
    >
      {label && (
        <div className="item-center flex flex-col justify-center">
          <div
            className={`flex items-center justify-start gap-2 ${
              horizontal ? 'min-w-[100px]' : 'mb-1'
            } ${classNameLabel}`}
          >
            {iconLabel}
            <label className="text-md block font-medium text-gray-700 ">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
          </div>
        </div>
      )}
      <div className={`relative ${horizontal ? 'flex-1' : ''}`}>
        <textarea
          className="form-control resize-none bg-slate-100"
          rows={rows}
          value={value}
          readOnly={readOnly}
          onChange={(e) => onChange && onChange(e.target.value)}
        />
        {children}
      </div>
    </div>
  )
}

export default memo(InputArea)
