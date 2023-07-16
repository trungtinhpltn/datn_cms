import { validateNumber } from 'contants/validate'
import { _t } from 'contexts/i18n'
import * as yup from 'yup'

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const validateRequired = (label: string) =>
  yup.string().nullable().required(`Vui lòng nhập ${label}`)

export const validateRequiredMsg = (label: string) =>
  yup.string().nullable().required(`${label}`)

export const validatePhone = () =>
  yup
    .string()
    .max(15, 'SĐT tối đa 15 ký tự')
    .min(10, 'SĐT tối thiểu 10 ký tự')
    .matches(/^(84|0[3|5|7|8|9])[0-9]{8,13}$/, {
      message: 'Số điện thoại chưa đúng định dạng',
      excludeEmptyString: true
    })

export const validateEmail = () =>
  yup
    .string()
    .required('Vui lòng nhập email')
    .max(60, 'Email tối đa 60 ký tự')
    .email('Email không đúng định dạng')

export const validateCustomerPay = (label: string) =>
  yup
    .number()
    .typeError('Vui lòng nhập số!')
    .nullable()
    .required(
      _t('validate.required.yup', {
        values: { fieldName: label }
      })
    )
    .min(
      yup.ref('paymentPrice'),
      'Số tiền khách thanh toán phải lớn hoặc hoặc bằng tổng số tiền.'
    )

export const schemaCreatePaymentInfo = yup.object({
  name: validateRequired('họ tên khách hàng.'),
  phone: validatePhone(),
  paymentMethod: yup.string().required('Vui lòng chọn hình thức thanh toán'),
  customerPay: validateCustomerPay('số tiền khách thanh toán'),
  paymentPrice: validateNumber('số tiền phải thanh toán'),
  totalPrice: validateNumber('tổng số tiền'),
  taxPay: validateNumber('thuế VAT')
})
