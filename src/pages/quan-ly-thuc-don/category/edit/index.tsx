import EditView from 'components/EditView'
import InputForm from 'components/Input/InputForm'
import Popup from 'components/Layout/Popup'
import type { IListViewQuery } from 'components/ListView'
import useQueryParam from 'hooks/useQueryParams'
import type { ICategory } from 'models/menu'
import { useMutation, useQuery } from 'react-query'
import { editCategory, getCategoryById } from 'services/menu.service'
import { reloadTable } from 'utils/tabulator-tables'
import { toastError, toastSuccess } from 'utils/toast'
import { schemaCreateCategory } from 'validate/menu'

interface PopupCreateAppProps {
  closePopup: () => void
  show: boolean
}

const EditCategory = ({ closePopup, show }: PopupCreateAppProps) => {
  const [query] = useQueryParam<IListViewQuery>()
  const { data, isLoading } = useQuery({
    queryKey: ['category_edit', query?._edit],
    queryFn: (input) => getCategoryById(input.queryKey[1]),
    enabled: !!query?._edit
  })

  const updateCategoryInfo = useMutation({
    mutationFn: (data: ICategory) => editCategory(data),
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
      title="Sửa phân loại"
    >
      <EditView<ICategory>
        saveLabel={'Sửa'}
        showBackButton={false}
        defaultMode={'edit'}
        initialValues={data?.data}
        schema={schemaCreateCategory}
        isCreate={true}
        popupView={show}
        onSubmit={async ({ data }) => {
          updateCategoryInfo.mutate(data)
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

export default EditCategory
