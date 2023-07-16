import type * as yup from 'yup'
import type Lazy from 'yup/lib/Lazy'
import type Reference from 'yup/lib/Reference'

export type YupValidateObject<T> = Partial<
  Record<keyof T, yup.AnySchema | Reference | Lazy<any, any>>
>
