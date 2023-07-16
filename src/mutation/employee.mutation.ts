import { queryClient } from 'contexts/queryClient'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router'
import {
  createEmployee,
  deleteEmployee,
  updateEmployee
} from 'services/employee.service'
import { toastSuccess } from 'utils/toast'

export const useUpdateEmployee = () => {
  return useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      toastSuccess('Sửa nhân viên thành công')
      queryClient.invalidateQueries(['employee'])
    }
  })
}

export const useCreateEmployee = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      toastSuccess('Tạo nhân viên thành công')
      queryClient.invalidateQueries(['employee'])
      navigate('/quan-ly-nhan-vien')
    }
  })
}

export const useDeleteEmployee = () => {
  return useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      toastSuccess('Xoá nhân viên thành công')
      queryClient.invalidateQueries(['employee'])
    }
  })
}
