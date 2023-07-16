import { ajvResolver } from '@hookform/resolvers/ajv'
import { fullFormats } from 'ajv-formats/dist/formats'
import { getTicketsExportsSchema } from 'api/validations/ticket'
import classNames from 'classnames'
import InputText from 'components/Form/InputText'
import Popup from 'components/Layout/Popup'
import { _t } from 'contexts/i18n'
import { useForm } from 'react-hook-form'

interface PopupSendEmailProps {
  closePopup: () => void
  show: boolean
  className?: string
  message: string
  submitDataPopup: (data: Inputs) => void
}

export type Inputs = {
  email: string
}

const PopupSendEmail = ({
  closePopup,
  show,
  message,
  submitDataPopup
}: PopupSendEmailProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: ajvResolver(getTicketsExportsSchema.querystring, {
      formats: fullFormats
    }),
    mode: 'onChange'
  })

  const onSubmit = (dataInput: Inputs) => {
    submitDataPopup(dataInput)
  }

  return (
    <Popup
      closePopup={() => {
        closePopup()
      }}
      show={show}
      title={_t('user.export')}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="modal-body p-0">
        <div className="p-5 text-center">
          <div className="flex flex-col items-center justify-center">
            <p>{message}</p>
            <InputText
              register={register('email')}
              placeholder="email@example.com"
              error={errors.email}
              classNameInput="mt-3 w-[65%]"
            />
          </div>
        </div>
        <div className="px-5 pb-8 text-center">
          <button
            type="button"
            data-tw-dismiss="modal"
            className="btn btn-outline-secondary mr-1 w-24"
            onClick={() => closePopup()}
          >
            {_t('cancel')}
          </button>
          <button className={classNames('btn btn-primary w-24')}>
            {_t('ok')}
          </button>
        </div>
      </form>
    </Popup>
  )
}

export default PopupSendEmail
