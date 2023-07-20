import EditView from 'components/EditView'
import InputForm from 'components/Input/InputForm'
import InputImage from 'components/Input/InputImage'
import type { TOption } from 'components/Input/InputSelect'
import InputSelect from 'components/Input/InputSelect'
import { validateRequired } from 'contants/validate'
import { type CreateEmployeeDto, positionOptions } from 'models/employee'
import type { IProvince } from 'models/province'
import { useUpdateEmployee } from 'mutation/employee.mutation'
import { Controller } from 'react-hook-form'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'
import { getEmployeeById } from 'services/employee.service'
import { provinceAPI } from 'services/province.service'
import * as yup from 'yup'

const makeDefaultData = (data: any) => {
  if (data.dateOfBirth)
    data.dateOfBirth = new Date(data.dateOfBirth).toISOString().substring(0, 10)
  if (data.dateContract)
    data.dateContract = new Date(data.dateContract)
      .toISOString()
      .substring(0, 10)
  if (data.active) {
    data.active = '1'
  } else {
    data.active = '0'
  }
  Object.entries(data).forEach(([key, value]) => {
    if (value === '' || value === null) {
      delete data[key]
    }
  })
  return data
}

const MangermentStaffEdit = () => {
  const { id } = useParams()
  const { data, isLoading } = useQuery({
    queryKey: ['employee', id],
    queryFn: () => getEmployeeById(parseInt(id || '0')),
    enabled: !!id
  })

  const updateEmplyeeMutation = useUpdateEmployee()

  if (isLoading) {
    return <></>
  }

  return (
    <EditView<CreateEmployeeDto>
      saveLabel="Lưu"
      showBackButton={true}
      defaultMode={'edit'}
      initialValues={makeDefaultData(data)}
      schema={yup.object({
        name: validateRequired(),
        email: validateRequired()
      })}
      title="Sửa nhân viên"
      isCreate={true}
      onSubmit={async ({ data }) => {
        const cleanData: any = {
          ...data,
          active: data.active
            ? (data.active as any) === '1'
              ? true
              : false
            : undefined,
          dateOfBirth: data.dateOfBirth
            ? new Date(data.dateOfBirth).toISOString()
            : undefined,
          provinceId: data.provinceId ? +data.provinceId : undefined,
          districtId: data.districtId ? +data.districtId : undefined,
          dateContract: data.dateContract
            ? new Date(data.dateContract).toISOString()
            : undefined,
          wawe: data.wawe ? +data.wawe : 0,
          trialTime: data.trialTime ? +data.trialTime : 0
        }

        await updateEmplyeeMutation.mutateAsync({
          id: parseInt(id || '0'),
          data: cleanData
        })
      }}
      changeMode={false}
      renderView={({
        form: {
          register,
          formState: { defaultValues, errors },
          watch,
          control
        },
        mode
      }) => {
        return (
          <>
            <div className="intro-y box col-span-12 lg:col-span-6">
              <div className="p-5">
                <h2 className="mt-8 font-medium">TÀI KHOẢN</h2>

                <InputForm
                  {...register('name')}
                  title={'Tên nhân viên'}
                  type="text"
                  required
                  error={errors?.name?.message}
                  readOnly={mode === 'readonly'}
                  wrapperClassname="mt-2"
                />
                <InputForm
                  {...register('phone')}
                  title={'Điện thoại'}
                  type="text"
                  required
                  wrapperClassname="mt-2"
                  error={errors?.phone?.message}
                  readOnly={mode === 'readonly'}
                />
                <InputForm
                  {...register('email')}
                  title={'Email'}
                  type="email"
                  required
                  wrapperClassname="mt-2"
                  error={errors?.email?.message}
                  readOnly={mode === 'readonly'}
                />

                <h2 className="mt-8 font-medium">THÔNG TIN CÁ NHÂN</h2>
                <InputForm
                  {...register('dateOfBirth')}
                  title={'Ngày sinh'}
                  type="date"
                  error={errors?.dateOfBirth?.message}
                  wrapperClassname="mt-2"
                  readOnly={mode === 'readonly'}
                />
                <InputForm
                  {...register('placeOfBirth')}
                  title={'Nơi sinh'}
                  type="text"
                  wrapperClassname="mt-2"
                  error={errors?.placeOfBirth?.message}
                  readOnly={mode === 'readonly'}
                />
                <InputForm
                  {...register('nation')}
                  title={'Dân tộc'}
                  type="text"
                  wrapperClassname="mt-2"
                  error={errors?.nation?.message}
                  readOnly={mode === 'readonly'}
                />
                <InputForm
                  {...register('from')}
                  title={'Quê quán'}
                  type="text"
                  wrapperClassname="mt-2"
                  error={errors?.from?.message}
                  readOnly={mode === 'readonly'}
                />
                <InputForm
                  {...register('idNumber')}
                  title={'Số CCCD / Hộ chiếu'}
                  type="text"
                  wrapperClassname="mt-2"
                  error={errors?.idNumber?.message}
                  readOnly={mode === 'readonly'}
                />
                <InputSelect
                  name={`learn`}
                  loadOptions={async (): Promise<TOption[]> => {
                    return [
                      {
                        label: 'Không',
                        value: '0'
                      },
                      {
                        label: 'Hoàn thành tiểu học',
                        value: '1'
                      },
                      {
                        label: 'Hoàn thành Trung học',
                        value: '2'
                      },
                      {
                        label: '12/12',
                        value: '3'
                      },
                      {
                        label: 'Cử nhân',
                        value: '4'
                      },
                      {
                        label: 'Thạc sỹ',
                        value: '5'
                      },
                      {
                        label: 'Khác',
                        value: '6'
                      }
                    ]
                  }}
                  title={'Trình độ học vấn'}
                  placeholder={'Trình độ học vấn'}
                  error={errors?.learn?.message}
                  wrapperClassname="mt-2"
                  isMulti={false}
                />
                <InputForm
                  {...register('address')}
                  title={'Địa chỉ thường trú'}
                  type="text"
                  wrapperClassname="mt-2"
                  error={errors?.address?.message}
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
                  title={'Tỉnh'}
                  placeholder={'Tỉnh'}
                  error={errors?.provinceId?.message}
                  wrapperClassname="mt-2"
                  isMulti={false}
                />
                <InputSelect
                  key={`select-district-${watch('provinceId')}`}
                  name="districtId"
                  error={errors?.districtId?.message}
                  loadOptions={async (): Promise<TOption[]> => {
                    const data = await provinceAPI.getAll()
                    return data?.data?.data
                      ?.filter(
                        (item: IProvince) =>
                          item?.parentId ===
                          parseInt(watch('provinceId') || '-1')
                      )
                      ?.map((p: IProvince) => ({
                        label: p.name,
                        value: p.id
                      }))
                  }}
                  title={'Quận/Huyện'}
                  placeholder={'Quận/Huyện'}
                  wrapperClassname="mt-2"
                  isMulti={false}
                  isDisabled={!watch('provinceId')}
                />
              </div>
            </div>
            <div className="intro-y box col-span-12 lg:col-span-6">
              <div className="p-5">
                <label>Ảnh đại diện</label>
                <Controller
                  name={'image'}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <InputImage onChange={onChange} defaultImage={value} />
                  )}
                />
                <InputSelect
                  name={`active`}
                  loadOptions={async (): Promise<TOption[]> => {
                    return [
                      {
                        label: 'Hoạt động',
                        value: '1'
                      },
                      {
                        label: 'Không hoạt động',
                        value: '0'
                      }
                    ]
                  }}
                  title={'Trạng thái'}
                  placeholder={'Trạng thái'}
                  error={errors?.active?.message}
                  wrapperClassname="mt-2"
                  isMulti={false}
                />
                <InputSelect
                  name={`position`}
                  loadOptions={async (): Promise<TOption[]> => {
                    return positionOptions
                  }}
                  title={'Vị trí'}
                  placeholder={'Vị trí'}
                  error={errors?.position?.message}
                  wrapperClassname="mt-2"
                  isMulti={false}
                />
                <h2 className="mt-8 font-medium">THÔNG TIN HỢP ĐỒNG</h2>
                <InputSelect
                  name={`type`}
                  loadOptions={async (): Promise<TOption[]> => {
                    return [
                      {
                        label: 'Chính thức',
                        value: 'chinh_thuc'
                      },
                      {
                        label: 'Thử việc',
                        value: 'thu_viec'
                      }
                    ]
                  }}
                  title={'Loại hợp đồng'}
                  placeholder={'Loại hợp đồng'}
                  error={errors?.position?.message}
                  wrapperClassname="mt-2"
                  isMulti={false}
                />
                <InputForm
                  {...register('dateContract')}
                  title={'Ngày bắt đầu hợp đồng'}
                  type="date"
                  error={errors?.dateContract?.message}
                  wrapperClassname="mt-2"
                  readOnly={mode === 'readonly'}
                />
                <InputForm
                  {...register('trialTime')}
                  help="Đơn vị số ngày"
                  title={'Thời gian thử việc'}
                  type="text"
                  error={errors?.trialTime?.message}
                  wrapperClassname="mt-2"
                  readOnly={mode === 'readonly'}
                />{' '}
                <InputForm
                  {...register('wawe')}
                  help="Đơn vị VNĐ / tháng"
                  title={'Mức lương cơ bản'}
                  type="text"
                  error={errors?.wawe?.message}
                  wrapperClassname="mt-2"
                  readOnly={mode === 'readonly'}
                />
              </div>
            </div>
          </>
        )
      }}
    />
  )
}

export default MangermentStaffEdit
