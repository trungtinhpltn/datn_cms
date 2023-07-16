import { validateRequired } from 'contants/validate'
import * as yup from 'yup'

export const schemaCreateRestaurant = yup.object({
  name: validateRequired('tên nhà hàng'),
  addressDetail: validateRequired('địa chỉ chi tiết'),
  provinceId: validateRequired('tỉnh'),
  districtId: validateRequired('quận/huyện')
})

export const schemaCreateTableFood = yup.object({
  name: validateRequired('tên bàn ăn'),
  description: validateRequired('mô tả')
  // prePaymentAmount: validateNumber('giá đặt bàn')
})
