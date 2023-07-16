export interface IUser {
  username: string
  pasword: string
  role: 'admin' | 'manager' | 'user'
}

export const UserRoleOptions: Array<{
  label: string
  value: IUser['role']
}> = [
  { value: 'admin', label: 'Admin' },
  { value: 'manager', label: 'Quản lý' },
  { value: 'user', label: 'Người dùng' }
]
