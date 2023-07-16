import { getProfilesState, putProfilesState } from 'api/services/profile'
import type { SelectOption } from 'components/Select'
import Select from 'components/Select'
import { QueryKey } from 'contants/query'
import { _t } from 'contexts/i18n'
import { queryClient } from 'contexts/queryClient'
import { StateType } from 'models'
import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastSuccess } from 'utils/toast'

export type UserStatus = SelectOption

export default function UserStatusSelect() {
  const [options] = useState<UserStatus[]>([
    { value: StateType.BUSY, label: _t('type.busy'), icon: 'Plane' },
    { value: StateType.FREE, label: _t('type.free'), icon: 'RockingChair' }
  ])

  const { data } = useQuery({
    queryKey: [QueryKey.STATE_USER],
    queryFn: () =>
      getProfilesState().then((res) =>
        options.find((item) => item.value === res.state)
      )
  })

  const updateStateUser = useMutation({
    mutationFn: (state: UserState) => putProfilesState({ state: state }),
    onSuccess: () => {
      toastSuccess(_t('status.update.success'))
      queryClient.invalidateQueries([QueryKey.STATE_USER])
    }
  })

  return (
    <>
      <Select<UserStatus>
        className="user-status-select mr-r min-w-[160px] cursor-pointer sm:mr-6"
        placeholder={`${_t('table.column.status')}...`}
        options={options}
        value={data}
        handleFunc={(choice) => {
          updateStateUser.mutate(choice.value as UserState)
        }}
      />
    </>
  )
}
