import { QueryKey } from 'contants/query'
import { _t } from 'contexts/i18n'
import { queryClient } from 'contexts/queryClient'
import { useMutation } from 'react-query'
import axios from 'services/axiosClient'
import { toastSuccess } from 'utils/toast'

export interface IPageData {
  active: boolean
  avatar: string
  channelFbId: string
  createdAt: string
  emailCreated: string
  facebookAppId: string
  id: string
  name: string
  pageAccessToken: string
  status: string
  type: string
  zaloAccessToken: string
  zaloAppId: string
  zaloRefreshToken: string
}

interface IChannelData {
  listPage: IPageData[]
  nameApp: string
}

export const useDeleteApp = () => {
  return useMutation({
    mutationFn: (id: string) =>
      axios.delete(`/facebookApps/${id}`).then((res) => res.data),
    onSuccess: (data) => {
      toastSuccess(_t('app.delete.success'))
      queryClient.invalidateQueries([QueryKey.APP_FACEBOOK])
    }
  })
}
