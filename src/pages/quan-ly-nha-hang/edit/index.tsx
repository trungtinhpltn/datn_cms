import EditView from 'components/EditView'
import InputForm from 'components/Input/InputForm'
import type { TOption } from 'components/Input/InputSelect'
import InputSelect from 'components/Input/InputSelect'
import Loading from 'components/Loading'
import { BASE_RESTAURANT_LINK } from 'contants/baseLink'
import type { IProvince } from 'models/province'
import type { ICreateRestaurant } from 'models/restaurant'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { provinceAPI } from 'services/province.service'
import { editRestaurant, getRestaurantByid } from 'services/restaurant.service'
import { toastError, toastSuccess } from 'utils/toast'
import { schemaCreateRestaurant } from 'validate/restaurant'

export interface IHomeProps {}

const RestaurantEdit = () => {
  const { id } = useParams()
  const { data } = useQuery({
    queryKey: ['edit-restaurant', id],
    queryFn: () => getRestaurantByid(+(id + '')),
    enabled: !!id
  })

  const navigate = useNavigate()

  const updateRestaurantInfo = useMutation({
    mutationFn: (data: ICreateRestaurant) => {
      return editRestaurant({ id: +(data?.id + ''), data })
    },
    onSuccess: () => {
      toastSuccess('Cập nhật thông tin thành công.')
      navigate(BASE_RESTAURANT_LINK)
    },
    onError: (err: any) => {
      toastError(err?.message)
    }
  })

  return (
    <>
      <Loading show={updateRestaurantInfo.isLoading} />
      <EditView<ICreateRestaurant>
        showBackButton
        initialValues={data?.data || {}}
        schema={schemaCreateRestaurant}
        onSubmit={async ({ data }) => {
          updateRestaurantInfo.mutate(data)
        }}
        saveLabel="Sửa"
        defaultMode="edit"
        title={data?.data?.name}
        renderView={({
          form: {
            register,
            formState: { errors },
            watch
          }
        }) => {
          return (
            <div className="intro-y col-span-12 lg:col-span-6">
              <div className="intro-y box">
                <div className="p-5">
                  <InputForm
                    {...register('name')}
                    title={'Tên nhà hàng'}
                    type="text"
                    required
                    error={errors?.name?.message}
                  />
                  <InputForm
                    {...register('addressDetail')}
                    title={'Địa chỉ'}
                    type="text"
                    required
                    wrapperClassname="mt-2"
                    error={errors?.addressDetail?.message}
                  />
                  <InputSelect<ICreateRestaurant>
                    name={`provinceId`}
                    loadOptions={async (): Promise<TOption[]> => {
                      const res = await provinceAPI.getByType('TINH')
                      return res?.data?.data.map((p: IProvince) => ({
                        label: p.name,
                        value: p.id
                      }))
                    }}
                    required
                    title={'Tỉnh'}
                    placeholder={'Tỉnh'}
                    error={errors?.provinceId?.message}
                    wrapperClassname="mt-2"
                    isMulti={false}
                  />
                  <InputSelect<ICreateRestaurant>
                    key={`select-district-${watch('provinceId')}-edit`}
                    name="districtId"
                    error={errors?.districtId?.message}
                    loadOptions={async (): Promise<TOption[]> => {
                      const data = await provinceAPI.getAll()
                      return data?.data?.data
                        ?.filter(
                          (item: IProvince) =>
                            item?.parentId === watch('provinceId')
                        )
                        ?.map((p: IProvince) => ({
                          label: p.name,
                          value: p.id
                        }))
                    }}
                    required
                    title={'Quận/Huyện'}
                    placeholder={'Quận/Huyện'}
                    wrapperClassname="mt-2"
                    isMulti={false}
                    isDisabled={!watch('provinceId')}
                  />
                </div>
              </div>
            </div>
          )
        }}
      />
    </>
  )
}

export default RestaurantEdit
