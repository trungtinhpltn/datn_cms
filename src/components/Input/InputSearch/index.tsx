import classNames from 'classnames'
import { Search } from 'lucide-react'
import { forwardRef } from 'react'

import type { IInputProps } from '..'
import Input from '..'

const InputSearch = forwardRef((props: IInputProps, ref?: any) => {
  const { className, wrapperClassName, hideIcon, ...rest } = props
  return (
    <div
      className={classNames('relative w-56 text-slate-500', wrapperClassName)}
    >
      <Input
        ref={ref}
        type="text"
        placeholder="Search..."
        {...rest}
        className={classNames('w-full', className)}
      />
      <Search
        className={classNames(
          'absolute inset-y-0 right-0 my-auto mr-3 h-4 w-4',
          hideIcon && 'hidden'
        )}
      />
    </div>
  )
})

export default InputSearch
