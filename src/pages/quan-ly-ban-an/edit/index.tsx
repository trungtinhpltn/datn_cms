import EditView from 'components/EditView'
import InputForm from 'components/Input/InputForm'
import { BASE_TABLEFOOD_LINK } from 'contants/baseLink'
import type { ITableFood } from 'models/table-food'
import React from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router'
import { editTableFood, getTableFoodById } from 'services/tablefood.service'
import { toastError, toastSuccess } from 'utils/toast'
import { schemaCreateTableFood } from 'validate/restaurant'

const TableFoodEdit = () => {
  const { id } = useParams()
  const { data }: any = useQuery({
    queryKey: ['edit-restaurant', id],
    queryFn: () => getTableFoodById(+(id + '')),
    enabled: !!id
  })
  const navigate = useNavigate()

  const updateTableFoodInfo = useMutation({
    mutationFn: (data: ITableFood) => {
      return editTableFood({ id: +(data?.id + ''), data })
    },
    onSuccess: () => {
      toastSuccess('Cập nhật thông tin thành công.')
      navigate(BASE_TABLEFOOD_LINK)
    },
    onError: (err: any) => {
      toastError(err?.message)
    }
  })

  return (
    <EditView<ITableFood>
      showBackButton
      initialValues={data?.data || {}}
      schema={schemaCreateTableFood}
      onSubmit={async ({ data }) => {
        updateTableFoodInfo.mutate(data)
      }}
      saveLabel="Sửa"
      defaultMode="edit"
      title={data?.data?.name}
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
                  title={'Tên bàn'}
                  type="text"
                  required
                  error={errors?.name?.message}
                />
                <InputForm
                  {...register('description')}
                  title={'Mô tả'}
                  type="text"
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

export default TableFoodEdit
