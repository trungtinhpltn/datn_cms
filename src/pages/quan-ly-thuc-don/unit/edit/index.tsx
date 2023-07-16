import EditView from 'components/EditView'
import InputForm from 'components/Input/InputForm'
import type { IPopupProps } from 'components/Layout/Popup'
import Popup from 'components/Layout/Popup'
import type { IListViewQuery } from 'components/ListView'
import useQueryParam from 'hooks/useQueryParams'
import type { IUnit } from 'models/menu'
import { useMutation, useQuery } from 'react-query'
import { editUnit, getUnitById } from 'services/menu.service'
import { reloadTable } from 'utils/tabulator-tables'
import { toastError, toastSuccess } from 'utils/toast'
import { schemaCreateCategory } from 'validate/menu'

const EditMenuUnit = ({ closePopup, show }: IPopupProps) => {
  const [query] = useQueryParam<IListViewQuery>()
  const { data, isLoading } = useQuery({
    queryKey: ['unit_edit', query?._edit],
    queryFn: (input) => getUnitById(input.queryKey[1]),
    enabled: !!query?._edit
  })

  const updateUnitInfo = useMutation({
    mutationFn: (data: IUnit) => editUnit(data),
    onSuccess: () => {
      toastSuccess('Cập nhật thông tin thành công.')
      reloadTable()
      closePopup()
    },
    onError: (res: any) => {
      toastError(res?.message)
    }
  })
  return (
    <Popup
      closePopup={() => {
        closePopup()
      }}
      show={show}
      title="Sửa đơn vị tính"
    >
      <EditView<IUnit>
        saveLabel={'Sửa'}
        showBackButton={false}
        defaultMode={'edit'}
        initialValues={data?.data}
        schema={schemaCreateCategory}
        isCreate={true}
        popupView={show}
        onSubmit={async ({ data }) => {
          updateUnitInfo.mutate(data)
        }}
        renderView={({
          form: {
            register,
            formState: { errors }
          },
          mode
        }) => {
          return (
            <div className="z-50 p-5">
              <InputForm
                {...register('name')}
                error={errors.name?.message}
                title="Tên phân loại"
                type="text"
                placeholder="Tên phân loại"
                readOnly={mode === 'readonly'}
                wrapperClassname="mb-4"
                required
              />

              <InputForm
                {...register('description')}
                error={errors.description?.message}
                title="Mô tả"
                type="text"
                placeholder="Mô tả"
                readOnly={mode === 'readonly'}
                wrapperClassname="mb-4"
                required
              />
            </div>
          )
        }}
      />
    </Popup>
  )
}

export default EditMenuUnit
