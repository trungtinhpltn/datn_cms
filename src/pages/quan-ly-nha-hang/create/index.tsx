import EditView from 'components/EditView'
import InputForm from 'components/Input/InputForm'
import type { TOption } from 'components/Input/InputSelect'
import InputSelect from 'components/Input/InputSelect'
import Loading from 'components/Loading'
import { BASE_RESTAURANT_LINK } from 'contants/baseLink'
import { useGlobalContext } from 'contexts/global'
import type { IProvince } from 'models/province'
import type {
  ICreateRestaurant,
  IManagermentRestaurant
} from 'models/restaurant'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router'
import { provinceAPI } from 'services/province.service'
import { createRestaurant } from 'services/restaurant.service'
import { toastError, toastSuccess } from 'utils/toast'
import { schemaCreateRestaurant } from 'validate/restaurant'

const RestaurantCreate = () => {
  const navigate = useNavigate()
  const { initRestaurant } = useGlobalContext()

  const addRestaurantMutation = useMutation({
    mutationFn: (data: ICreateRestaurant) => createRestaurant(data),
    onSuccess: () => {
      toastSuccess('Thêm nhà hàng thành công')
      navigate(BASE_RESTAURANT_LINK)
      initRestaurant && initRestaurant()
    },
    onError: (res: any) => {
      toastError(res?.message)
    }
  })

  return (
    <>
      <Loading show={addRestaurantMutation.isLoading} />
      <EditView<IManagermentRestaurant>
        saveLabel="Thêm"
        showBackButton={true}
        defaultMode={'edit'}
        initialValues={{}}
        schema={schemaCreateRestaurant}
        title="Thêm nhà hàng"
        isCreate={true}
        onSubmit={async ({ data }) => {
          addRestaurantMutation.mutate({
            name: data?.name + '',
            addressDetail: data?.addressDetail + '',
            provinceId: +(data?.provinceId + ''),
            districtId: +(data?.districtId + '')
          })
        }}
        changeMode={false}
        renderView={({
          form: {
            register,
            formState: { errors },
            watch
          },
          mode
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
                    readOnly={mode === 'readonly'}
                  />
                  <InputForm
                    {...register('addressDetail')}
                    title={'Địa chỉ'}
                    type="text"
                    required
                    wrapperClassname="mt-2"
                    error={errors?.addressDetail?.message}
                    readOnly={mode === 'readonly'}
                  />
                  <InputSelect
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
                  <InputSelect<IManagermentRestaurant>
                    key={`select-district-${watch('provinceId')}`}
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

export default RestaurantCreate
