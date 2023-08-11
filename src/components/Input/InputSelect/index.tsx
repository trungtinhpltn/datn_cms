import classNames from 'classnames'
import { debounce, flattenDeep } from 'lodash'
import { useCallback, useState } from 'react'
import type { FieldValues, Path } from 'react-hook-form'
import { Controller, useFormContext } from 'react-hook-form'
import type { MultiValue, SingleValue } from 'react-select'
import AsyncSelect from 'react-select/async'
import type { AsyncProps } from 'react-select/dist/declarations/src/useAsync'

export type TOption = {
  label: string
  value: string
}
export interface IInputFormProps<T extends FieldValues>
  extends AsyncProps<TOption, boolean, { label: string; options: TOption[] }> {
  title?: string
  help?: string
  error?: string
  wrapperClassname?: string
  subClassname?: string
  selectClassname?: string
  name: Path<T>
  required?: boolean
  loadOptions: (input: string) => Promise<TOption[]>
  handleChangeFunc?: (value: TOption | null) => void
}

export default function InputSelect<T extends FieldValues>(
  props: IInputFormProps<T>
) {
  const {
    title,
    help,
    error,
    wrapperClassname,
    subClassname,
    name,
    required,
    selectClassname,
    loadOptions,
    handleChangeFunc,
    ...rest
  } = props

  const { control } = useFormContext()
  const [options, setOptions] = useState<TOption[]>([])

  const filterOption = useCallback(
    (value: string[], isAll?: boolean) => {
      return isAll
        ? options?.slice(1)
        : options?.filter((otp) => value?.includes(otp.value))
    },
    [options]
  )

  return (
    <div
      className={classNames(
        'input-form',
        error && 'has-error',
        wrapperClassname
      )}
    >
      <div className={classNames(subClassname)}>
        <div className="form-label flex w-full flex-col sm:flex-row">
          {title} {required && <span className="ml-1 text-red-500">*</span>}
          {help && (
            <span className="mt-1 text-xs text-slate-500 sm:ml-auto sm:mt-0">
              {help}
            </span>
          )}
        </div>
        <div className="flex w-full flex-col">
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => {
              const computeCurrentValue = () => {
                let currentValue
                if (rest.isMulti) {
                  currentValue = (value as string[])?.find(
                    (op: string) => op === 'all'
                  )
                    ? filterOption(value, true)
                    : filterOption(value)
                }
                if (!rest.isMulti) {
                  currentValue = filterOption([value])?.[0]
                  if (
                    !currentValue &&
                    value &&
                    value?.toString?.() ===
                      (rest.defaultValue as TOption)?.value
                  ) {
                    currentValue = { ...rest.defaultValue }
                  }
                }
                currentValue ||= null
                return currentValue
              }

              const debounceLoadOptions = debounce(
                async (
                  input: string,
                  callback: (options: TOption[]) => void
                ) => {
                  const result = await loadOptions(input)
                  callback(result)
                  setOptions(result)
                  return result
                },
                1000
              )

              return (
                <AsyncSelect<
                  TOption,
                  boolean,
                  { label: string; options: TOption[] }
                >
                  className={classNames(
                    'tom-select w-fulls react-select-container',
                    selectClassname
                  )}
                  classNamePrefix="select-input__custom react-select"
                  onChange={(newValue) => {
                    const isMulti = (
                      value: MultiValue<TOption> | SingleValue<TOption>
                    ): value is MultiValue<TOption> => {
                      return Array.isArray(value)
                    }
                    isMulti(newValue)
                      ? onChange(
                          flattenDeep(
                            newValue.map((val) => {
                              if (val.value == 'all') {
                                return options.slice(1).map((op) => op.value)
                              }
                              return val.value
                            })
                          )
                        )
                      : (onChange(newValue ? newValue.value : null),
                        handleChangeFunc && handleChangeFunc(newValue))
                  }}
                  value={computeCurrentValue() as TOption}
                  isClearable={true}
                  loadOptions={debounceLoadOptions}
                  defaultOptions
                  cacheOptions
                  {...rest}
                />
              )
            }}
          />
          {error && <div className="mt-2 text-danger">{error}</div>}
        </div>
      </div>
    </div>
  )
}
