import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import Button from 'components/Button'
import Loading from 'components/Loading'
import { _t } from 'contexts/i18n'
import { pickBy } from 'lodash'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import type { DeepPartial, FieldValues } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import type { UseFormReturn } from 'react-hook-form/dist/types/form'
import { useNavigate } from 'react-router-dom'
export type SubmitProps<T> = {
  data: T
  modifiedData: Partial<T>
  //   dirtyFields: Partial<Readonly<DeepMap<DeepPartial<T>, boolean>>>
}

export type EditViewMode = 'edit' | 'readonly'

export type RenderViewProps<T extends FieldValues> = {
  form: UseFormReturn<T>
  mode: EditViewMode
}
export type IEditViewProps<T extends FieldValues> = React.PropsWithChildren<{
  initialValues?: DeepPartial<T>
  schema: any
  onSubmit: (props: SubmitProps<T>) => void | Promise<void>
  title?: string
  isCreate?: boolean
  defaultMode?: EditViewMode
  renderView: ({ form, mode }: RenderViewProps<T>) => ReactNode
  showBackButton?: boolean
  onBack?: () => void | Promise<void>
  popupView?: boolean
  loading?: boolean
  saveLabel?: string
  changeMode?: boolean
  enabelEdit?: boolean
  customSave?: boolean
}>

export default function EditView<T extends FieldValues>(
  props: IEditViewProps<T>
) {
  const {
    initialValues,
    schema,
    onSubmit,
    title,
    renderView,
    defaultMode,
    isCreate,
    showBackButton,
    onBack,
    popupView,
    loading,
    saveLabel,
    changeMode = true,
    enabelEdit = true,
    customSave = false
  } = props

  const form = useForm<T>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    mode: 'onChange'
  })

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    control,
    clearErrors,
    formState: { errors, isDirty, dirtyFields },
    getValues
  } = form
  const navigate = useNavigate()

  const [mode, setMode] = useState<EditViewMode>(defaultMode || 'readonly')

  useEffect(() => reset(initialValues), [initialValues, reset])

  return (
    <FormProvider {...form}>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(async (data) => {
          const modifiedData = pickBy(data, (value, key) =>
            Boolean(dirtyFields[key])
          ) as Partial<T>
          await onSubmit({ data, modifiedData })
          changeMode && setMode('readonly')
        })}
        className={classNames(popupView && 'flex flex-col-reverse')}
      >
        <>
          <div
            className={classNames(
              'intro-y mt-8 flex items-center',
              popupView &&
                'box mt-0 justify-end rounded-b-lg border-t border-slate-200/60 p-2 px-5'
            )}
          >
            {showBackButton && (
              <Button
                color="secondary"
                iconName="ChevronLeft"
                size="sm"
                iconClassName="mr-1"
                className="mr-4 px-3"
                outline
                type="button"
                onClick={() => (onBack ? onBack() : navigate(-1))}
              >
                {_t('back')}
              </Button>
            )}

            {title && <h2 className="mr-auto text-lg font-medium">{title}</h2>}
            <div>
              {mode === 'edit' && (
                <>
                  <Button
                    type="button"
                    color="secondary"
                    className="ml-2"
                    iconName="X"
                    disable={isCreate && !isDirty}
                    onClick={() => {
                      reset()
                      if (isCreate) {
                        return
                      }
                      setMode('readonly')
                      navigate(-1)
                    }}
                  >
                    {_t('cancel')}
                  </Button>

                  {customSave ? (
                    <Button
                      type="submit"
                      className="ml-2"
                      iconName="Save"
                      disable={!isDirty && !enabelEdit}
                    >
                      {saveLabel}
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="ml-2"
                      iconName="Save"
                      disable={!isDirty}
                    >
                      {saveLabel}
                    </Button>
                  )}
                </>
              )}
              {mode === 'readonly' && (
                <>
                  <Button
                    type="button"
                    color="primary"
                    className="ml-2"
                    iconName="Edit3"
                    onClick={() => {
                      setMode('edit')
                    }}
                  >
                    {_t('action.button.edit')}
                  </Button>
                </>
              )}
            </div>
          </div>
          <div
            className={classNames(
              'grid gap-6',
              popupView ? '' : 'mt-5 grid-cols-12'
            )}
          >
            {loading ? (
              <div className="intro-y col-span-12">
                <div className="intro-y box h-96 rounded-b-none">
                  <Loading show={loading} />
                </div>
              </div>
            ) : (
              renderView({ form, mode })
            )}
          </div>
        </>
      </form>
    </FormProvider>
  )
}
