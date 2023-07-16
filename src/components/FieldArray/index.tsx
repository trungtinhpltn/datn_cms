import Button from 'components/Button'
import Icon from 'components/Icon'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import type {
  FieldArray,
  FieldValues,
  Path,
  UseFieldArrayAppend,
  UseFieldArrayPrepend,
  UseFieldArrayRemove
} from 'react-hook-form'
import { useFieldArray, useFormContext } from 'react-hook-form'

export type RenderViewProps = {
  fields: Record<'id', string>[]
  remove: UseFieldArrayRemove
  prepend: UseFieldArrayPrepend<FieldValues, string>
  append: UseFieldArrayAppend<FieldValues, string>
}

type IFIeldArray<T extends FieldValues> = React.PropsWithChildren<{
  name: string
  renderView: ({ fields, remove, prepend }: RenderViewProps) => ReactNode
  dataInit?:
    | FieldArray<FieldValues, Path<T>>
    | FieldArray<FieldValues, Path<T>>[]
  title?: string
  label?: string
  shouldInitFirstData?: boolean
}>

export default function FieldArrays<T extends FieldValues>({
  name,
  renderView,
  dataInit,
  title,
  label,
  shouldInitFirstData
}: IFIeldArray<T>) {
  const { control } = useFormContext()
  const { fields, prepend, remove, append } = useFieldArray({
    control,
    name: name
  })

  useEffect(() => {
    prepend(dataInit)
  }, [dataInit, prepend, shouldInitFirstData])

  return (
    <div>
      {label && (
        <div className="mt-3 -mb-1 flex items-center justify-between">
          <label>{label}</label>
          {fields.length <= 0 && (
            <Icon
              iconName="Plus"
              className="h-4 w-4 cursor-pointer font-bold"
              onClick={() => {
                append('')
              }}
            />
          )}
        </div>
      )}
      <div>{renderView({ fields, remove, prepend, append })}</div>
      {title && dataInit && (
        <Button
          size="sm"
          className="mt-3"
          outline
          onClick={() => prepend(dataInit)}
          type="button"
        >
          {title}
        </Button>
      )}
    </div>
  )
}
