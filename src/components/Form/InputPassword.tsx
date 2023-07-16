import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'
import type { FieldError } from 'react-hook-form'

interface InputPasswordProps extends React.HTMLAttributes<HTMLDivElement> {
  register: object
  className?: string
  label?: string
  error: FieldError | undefined
  classNameInput?: string
}

const InputPassword = ({
  register,
  error,
  className,
  classNameInput,
  label,
  ...rest
}: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  return (
    <div className={className ? className : ''}>
      {label && (
        <label className="text-md mb-2 block font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          {...register}
          {...rest}
          className={`w-full appearance-none rounded p-3 pr-11 leading-tight text-gray-700 ${
            classNameInput ? classNameInput : ``
          } `}
          type={showPassword ? `text` : `password`}
        />
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
      {error && <p className={`mt-2 text-sm text-red-500`}>{error?.message}</p>}
    </div>
  )
}

export default InputPassword
