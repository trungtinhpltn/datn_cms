import EditView from 'components/EditView'
import InputForm from 'components/Input/InputForm'
import TextAreaForm from 'components/Input/TextAreaForm'
import { BASE_TABLEFOOD_LINK } from 'contants/baseLink'
import { useGlobalContext } from 'contexts/global'
import type { ITableFood } from 'models/table-food'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router'
import { createTableFood } from 'services/tablefood.service'
import { toastError, toastSuccess } from 'utils/toast'
import { schemaCreateTableFood } from 'validate/restaurant'

const TableFoodCreate = () => {
  const navigate = useNavigate()
  const { restaurantSelect } = useGlobalContext()

  const addTableFoodMutation = useMutation({
    mutationFn: (data: ITableFood) => createTableFood(data),
    onSuccess: () => {
      toastSuccess('Thêm bàn ăn thành công')
      navigate(BASE_TABLEFOOD_LINK)
    },
    onError: (res: any) => {
      toastError(res?.message)
    }
  })

  return (
    <EditView<ITableFood>
      saveLabel="Thêm"
      showBackButton={true}
      defaultMode={'edit'}
      initialValues={{}}
      schema={schemaCreateTableFood}
      title="Thêm bàn ăn"
      isCreate={true}
      onSubmit={async ({ data }) => {
        addTableFoodMutation.mutate({
          ...data,
          restaurantId: restaurantSelect?.id
        })
      }}
      changeMode={false}
      renderView={({
        form: {
          register,
          formState: { errors }
        }
      }) => {
        return (
          <div className="intro-y col-span-12 lg:col-span-6">
            <div className="intro-y box">
              <div className="p-5">
                <InputForm
                  {...register('name')}
                  title={'Tên bàn ăn'}
                  type="text"
                  required
                  error={errors?.name?.message}
                />
                <TextAreaForm
                  {...register('description')}
                  title={'Mô tả'}
                  required
                  wrapperClassname="mt-2"
                  error={errors?.description?.message}
                />
                {/* <InputForm
                  {...register('prePaymentAmount')}
                  title={'Giá đặt bàn'}
                  type="number"
                  required
                  wrapperClassname="mt-2"
                  error={errors?.prePaymentAmount?.message}
                /> */}
              </div>
            </div>
          </div>
        )
      }}
    />
  )
}

export default TableFoodCreate
