import classNames from 'classnames'
import { forwardRef } from 'react'

export interface IInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  wrapperClassName?: string
  hideIcon?: boolean
}

const Input = (props: IInputProps, ref?: any) => {
  const { className, hideIcon, wrapperClassName, ...rest } = props
  return (
    <input
      ref={ref}
      {...rest}
      className={classNames('form-control', className)}
    />
  )
}

export default forwardRef(Input)
