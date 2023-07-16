import EditView from 'components/EditView'
import InputForm from 'components/Input/InputForm'
import Popup from 'components/Layout/Popup'
import type { ICategory } from 'models/menu'
import { useMutation } from 'react-query'
import { createCategory } from 'services/menu.service'
import { reloadTable } from 'utils/tabulator-tables'
import { toastError, toastSuccess } from 'utils/toast'
import { schemaCreateCategory } from 'validate/menu'

interface PopupCreateAppProps {
  closePopup: () => void
  show: boolean
}

const CreateCategory = ({ closePopup, show }: PopupCreateAppProps) => {
  const addCategory = useMutation({
    mutationFn: (data: ICategory) => createCategory(data),
    onSuccess: () => {
      toastSuccess('Thêm thành công')
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
      title="Thêm phân loại"
    >
      <EditView<ICategory>
        saveLabel={'Thêm'}
        showBackButton={false}
        defaultMode={'edit'}
        initialValues={{}}
        schema={schemaCreateCategory}
        isCreate={true}
        popupView={show}
        onSubmit={async ({ data }) => {
          addCategory.mutate(data)
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

export default CreateCategory
