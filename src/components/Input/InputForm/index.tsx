import classNames from 'classnames'
import { Eye, EyeOff } from 'lucide-react'
import { forwardRef, useState } from 'react'

import type { IInputProps } from '..'
import Input from '..'

export interface IInputFormProps extends IInputProps {
  title?: string
  help?: string
  error?: string
  wrapperClassname?: string
  required?: boolean
}

const InputForm = forwardRef((props: IInputFormProps, ref?: any) => {
  const { title, help, error, wrapperClassname, required, ...rest } = props
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <div
      className={classNames(
        'input-form',
        error && 'has-error',
        wrapperClassname
      )}
    >
      <label>
        {title && (
          <div className="form-label flex w-full flex-col justify-start space-x-2 sm:flex-row">
            <span>{title}</span>
            {required && <span className="text-red-500">*</span>}
            {help && (
              <span className="mt-1 text-xs text-slate-500">{help}</span>
            )}
          </div>
        )}
        <div className="relative">
          <Input
            ref={ref}
            {...rest}
            type={rest.type && showPassword ? 'text' : rest.type}
          />
          {rest.type === 'password' && (
            <div>
              {!showPassword ? (
                <EyeOff
                  color="black"
                  size={25}
                  className="absolute inset-y-0 right-0 z-50 m-auto mr-4 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <Eye
                  color="black"
                  size={25}
                  className="absolute inset-y-0 right-0 z-50 m-auto mr-4 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
          )}
        </div>
        {error && <div className="mt-2 text-danger">{error}</div>}
      </label>
    </div>
  )
})

export default InputForm
