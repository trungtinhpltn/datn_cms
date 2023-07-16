import classNames from 'classnames'
import { forwardRef } from 'react'

export interface ITextAreaFormProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  title?: string
  help?: string
  error?: string
  wrapperClassname?: string
  required?: boolean
}

const TextAreaForm = forwardRef((props: ITextAreaFormProps, ref?: any) => {
  const {
    title,
    help,
    error,
    wrapperClassname,
    required = false,
    ...rest
  } = props
  return (
    <div
      className={classNames(
        'input-form',
        error && 'has-error',
        wrapperClassname
      )}
    >
      <label>
        <div className="form-label flex w-full flex-col sm:flex-row">
          {title} {required && <span className="text-red-500">*</span>}
          {help && (
            <span className="mt-1 text-xs text-slate-500 sm:ml-auto sm:mt-0">
              {help}
            </span>
          )}
        </div>
        <textarea ref={ref} className="form-control" {...rest} />
        {error && <div className="mt-2 text-danger">{error}</div>}
      </label>
    </div>
  )
})

export default TextAreaForm
