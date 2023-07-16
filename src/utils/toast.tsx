import { toast } from 'react-toastify'

export const toastSuccess = (title: string, body = {}, timeout = 1000) => {
  toast.success(title, {
    autoClose: timeout,
    position: 'top-right',
    pauseOnHover: false,
    pauseOnFocusLoss: false,
    ...body
  })
}

export const toastError = (title: string, body = {}, timeout = 1000) => {
  toast.error(title, {
    autoClose: timeout,
    position: 'bottom-right',
    pauseOnHover: false,
    pauseOnFocusLoss: false,
    ...body
  })
}

export const toastWarning = (title: string, body = {}, timeout = 1000) => {
  toast.warning(title, {
    autoClose: timeout,
    position: 'top-right',
    pauseOnHover: false,
    pauseOnFocusLoss: false,
    ...body
  })
}
