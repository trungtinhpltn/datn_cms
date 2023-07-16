import {
  validateDiscountPrice,
  validateNumber,
  validateRequired
} from 'contants/validate'
import * as yup from 'yup'

export const schemaCreateCategory = yup.object({
  name: validateRequired('tên phân loại'),
  description: validateRequired('mô tả')
})

export const schemaCreateMenuItem = yup.object({
  name: validateRequired('tên món ăn'),
  description: validateRequired('mô tả'),
  price: validateNumber('giá gốc'),
  discountPrice: validateDiscountPrice('price'),
  unitId: validateRequired('đơn vị tính'),
  categoryId: validateRequired('phân loại')
})
