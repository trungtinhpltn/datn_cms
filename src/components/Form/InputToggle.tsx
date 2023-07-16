import classNames from 'classnames'
import type { IInputProps } from 'components/Input'

interface IInputToggleProps extends IInputProps {
  label?: string
  className?: string
}

export default function InputToggle(props: IInputToggleProps, ref?: any) {
  const { label, className, readOnly, ...rest } = props

  return (
    <label className="flex w-full items-center justify-end">
      <label
        htmlFor={label}
        className={classNames(
          className,
          'mr-3 text-base text-gray-900 dark:text-gray-300'
        )}
      >
        {label}
      </label>
      <div
        className={classNames(
          'relative my-auto inline-flex cursor-pointer',
          readOnly && 'cursor-not-allowed opacity-70'
        )}
      >
        <input
          type="checkbox"
          className="peer sr-only"
          id={label}
          {...ref}
          {...rest}
          disabled={readOnly}
        />
        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
      </div>
    </label>
  )
}
