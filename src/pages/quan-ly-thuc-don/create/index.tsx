import EditView from 'components/EditView'
import Icon from 'components/Icon'
import InputForm from 'components/Input/InputForm'
import type { TOption } from 'components/Input/InputSelect'
import InputSelect from 'components/Input/InputSelect'
import TextAreaForm from 'components/Input/TextAreaForm'
import { BASE_MENU_ITEM_LINK } from 'contants/baseLink'
import { useGlobalContext } from 'contexts/global'
import type { ICategory, IMenuItem, IUnit } from 'models/menu'
import { useRef, useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router'
import {
  createMenuItem,
  getAllCategory,
  getAllUnit
} from 'services/menu.service'
import { uploadFile } from 'services/upload.service'
import { toastError, toastSuccess } from 'utils/toast'
import { schemaCreateMenuItem } from 'validate/menu'

const MenuItemCreate = () => {
  const navigate = useNavigate()
  const { restaurantSelect } = useGlobalContext()
  const imgRef = useRef<any>()
  const [selectedFile, setSelectedFile] = useState<any>()

  const imageHandler = (e: any) => {
    setSelectedFile(e.target.files[0])
  }

  const addMenuItemMutation = useMutation({
    mutationFn: (data: IMenuItem) => {
      return createMenuItem({
        ...data,
        restaurantId: +(restaurantSelect?.id + ''),
        unitId: +data.unitId,
        categoryId: +data.categoryId
      })
    },
    onSuccess: () => {
      toastSuccess('Thêm món ăn thành công')
      navigate(BASE_MENU_ITEM_LINK)
    },
    onError: (res: any) => {
      toastError(res?.message)
    }
  })

  return (
    <EditView<IMenuItem>
      saveLabel="Thêm"
      showBackButton={true}
      defaultMode={'edit'}
      initialValues={{}}
      schema={schemaCreateMenuItem}
      title="Thêm món ăn"
      isCreate={true}
      onSubmit={async ({ data }) => {
        if (!selectedFile) {
          toastError('Vui lòng chọn hình ảnh')
        }

        const formData = new FormData()
        formData.append('file', selectedFile)
        const res = await uploadFile(formData)
        if (!res?.data) {
          toastError('Tải ảnh lên thất bại vui lòng thử lại sau.')
          return
        }
        addMenuItemMutation.mutate({ ...data, image: res?.data })
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
                  title={'Tên món ăn'}
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
                <div className="mt-2">
                  <div className="form-label flex w-full flex-col sm:flex-row">
                    Hình ảnh<span className="text-red-500">*</span>
                  </div>

                  <div
                    className={`relative mb-4 max-h-[150px] ${
                      selectedFile ? 'inline-block' : 'hidden'
                    }`}
                  >
                    <img
                      className={`mb-4 max-h-[150px]`}
                      src={
                        selectedFile ? URL.createObjectURL(selectedFile) : ''
                      }
                    />
                    <Icon
                      iconName="X"
                      className="absolute -top-2 -right-5 cursor-pointer"
                      onClick={() => {
                        setSelectedFile(null)
                        imgRef.current.value = null
                      }}
                    />
                  </div>
                  <input
                    className="block w-full cursor-pointer rounded border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400"
                    aria-describedby="file_input_help"
                    type="file"
                    onChange={imageHandler}
                    ref={imgRef}
                  />
                  <p
                    className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                    id="file_input_help"
                  >
                    {`(PNG, JPG, JEPG, GIF)`}
                  </p>
                </div>

                <InputForm
                  {...register('price')}
                  title={'Giá gốc'}
                  type="number"
                  required
                  wrapperClassname="mt-2"
                  error={errors?.price?.message}
                />
                <InputForm
                  {...register('discountPrice')}
                  title={'Giá khuyến mãi'}
                  type="number"
                  wrapperClassname="mt-2"
                  error={errors?.discountPrice?.message}
                />
                <InputSelect
                  name={`unitId`}
                  loadOptions={async (): Promise<TOption[]> => {
                    const res = await getAllUnit()
                    return res?.data.map((p: IUnit) => ({
                      label: p.name,
                      value: p.id
                    }))
                  }}
                  required
                  title={'Đơn vị tính'}
                  placeholder={'Đơn vị tính'}
                  error={errors?.unitId?.message}
                  wrapperClassname="mt-2"
                  isMulti={false}
                />
                <InputSelect
                  name={`categoryId`}
                  loadOptions={async (): Promise<TOption[]> => {
                    const res = await getAllCategory()
                    return res?.data.map((p: ICategory) => ({
                      label: p.name,
                      value: p.id
                    }))
                  }}
                  required
                  title={'Phân loại'}
                  placeholder={'Phân loại'}
                  error={errors?.categoryId?.message}
                  wrapperClassname="mt-2"
                  isMulti={false}
                />
              </div>
            </div>
          </div>
        )
      }}
    />
  )
}

export default MenuItemCreate
