import { postAuthForgotPassword } from 'api/services/auth'
import {
  getPermissions,
  getPermissionsGroup,
  postPermissions,
  putPermissionById
} from 'api/services/permission'
import { postProfilesChangePassword, putProfiles } from 'api/services/profile'
import {
  deleteUserById,
  getUserById,
  getUsers,
  getUsersExports,
  postUsers,
  putUserById
} from 'api/services/user'
import type { IListViewQuery } from 'components/ListView'
import type { Inputs } from 'components/PopupSendEmail'
import { QueryKey } from 'contants/query'
import type { User } from 'contexts/auth'
import { _t } from 'contexts/i18n'
import { queryClient } from 'contexts/queryClient'
import useQueryParam from 'hooks/useQueryParams'
import type { ChangePasswordData } from 'pages/PersonalInformation/ChangePassword'
import type { personalData } from 'pages/PersonalInformation/EditPersonalInformation'
import type { ManageUserData } from 'pages/UserManagement/User'
import { useMutation, useQuery } from 'react-query'
import { reloadTable } from 'utils/tabulator-tables'
import { toastSuccess } from 'utils/toast'

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (data: ManageUserData) =>
      postUsers({ ...data, projectIds: data.assigned }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.USERS]
      })
      queryClient.invalidateQueries({
        queryKey: [QueryKey.USER, data.id]
      })
      toastSuccess(_t('user.create.success'))
      reloadTable()
    }
  })
}

export const useGetUser = () => {
  const [query] = useQueryParam<IListViewQuery>()
  return useQuery({
    queryKey: [QueryKey.USER, query?._edit],
    queryFn: (input) =>
      getUserById({
        id: input.queryKey[1]
      }),
    enabled: !!query?._edit
  })
}

export const useGetUsers = (searchUser?: string) => {
  return useQuery({
    queryKey: [QueryKey.USERS, searchUser],
    queryFn: () =>
      getUsers({
        page: 1,
        size: 10,
        q: searchUser
      }).then((res) =>
        res.results?.map((item) => ({
          value: item.email,
          label: item.email
        }))
      )
  })
}

export const useEditUser = () => {
  const [query] = useQueryParam<IListViewQuery>()
  return useMutation({
    mutationFn: (data: ManageUserData) =>
      putUserById({ ...data, id: query?._edit, projectIds: data.assigned }),
    onSuccess: () => {
      toastSuccess(_t('user.update.success'))
      queryClient.invalidateQueries([QueryKey.USER, query?._edit])
      queryClient.invalidateQueries([QueryKey.USERS])
      reloadTable()
    }
  })
}

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: (id: string) => deleteUserById({ id: id }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries([QueryKey.USERS])
      queryClient.invalidateQueries([QueryKey.USER, variables])
      toastSuccess(_t('user.delete.success'))
    }
  })
}

export const useExportUser = () => {
  return useMutation({
    mutationFn: (email: string) => getUsersExports({ email: email }),
    onSuccess: () => {
      toastSuccess(_t('export.message.success'))
    }
  })
}

export const useCreatePermission = () => {
  return useMutation({
    mutationFn: postPermissions,
    onSuccess: () => {
      toastSuccess(_t('permission.add.success'))
      queryClient.invalidateQueries([QueryKey.PERMISSION_GROUPS])
    }
  })
}

export const useGetPermissions = (selectedRole: string) => {
  return useQuery([QueryKey.PERMISSION_DETAIL, selectedRole], ({ queryKey }) =>
    getPermissions({ role: queryKey[1] })
  )
}

export const useEditPermission = (selectedRole: string) => {
  return useMutation(putPermissionById, {
    onSuccess: (data, variables, context) => {
      console.log(data, variables, context)
      const { id, effect = 'allow' } = variables
      queryClient.setQueryData<GetPermissionsResponse>(
        [QueryKey.PERMISSION_DETAIL, selectedRole],
        (old = []) =>
          old.map((todo) => {
            if (todo.id === id) return { ...todo, effect }
            return todo
          })
      )
    }
  })
}

export const useGetPermissionGroups = () => {
  return useQuery(QueryKey.PERMISSION_GROUPS, getPermissionsGroup)
}

export const useForgetPassword = (
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return useMutation({
    mutationFn: (data: Inputs) => postAuthForgotPassword(data),
    onSuccess: () => {
      toastSuccess(_t('forgetpassword.success'))
      setSuccess(true)
    }
  })
}

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordData) => postProfilesChangePassword(data),
    onSuccess: () => {
      toastSuccess(_t('profile.password.update.success'))
    }
  })
}

export const useEditProfile = (user: User | null | undefined) => {
  return useMutation({
    mutationFn: (data: personalData) => putProfiles(data),
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKey.PROFILE, user?.id])
      toastSuccess(_t('profile.update.success'))
    }
  })
}
