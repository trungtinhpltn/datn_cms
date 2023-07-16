import EditView from 'components/EditView'
import InputForm from 'components/Input/InputForm'
import Popup from 'components/Layout/Popup'
import type { IUnit } from 'models/menu'
import React from 'react'
import { useMutation } from 'react-query'
import { createUnit } from 'services/menu.service'
import { reloadTable } from 'utils/tabulator-tables'
import { toastError, toastSuccess } from 'utils/toast'
import { schemaCreateCategory } from 'validate/menu'

interface PopupCreateAppProps {
  closePopup: () => void
  show: boolean
}

const CreateMenuUnit = ({ closePopup, show }: PopupCreateAppProps) => {
  const addUnit = useMutation({
    mutationFn: (data: IUnit) => createUnit(data),
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
      <EditView<IUnit>
        saveLabel={'Thêm'}
        showBackButton={false}
        defaultMode={'edit'}
        initialValues={{}}
        schema={schemaCreateCategory}
        isCreate={true}
        popupView={show}
        onSubmit={async ({ data }) => {
          addUnit.mutate(data)
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
                title="Tên đơn vị tính"
                type="text"
                placeholder="Tên đơn vị tính"
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

export default CreateMenuUnit
