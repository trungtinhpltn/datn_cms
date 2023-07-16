import { postNotificationsMarkRead } from 'api/services/notification'
import axios from 'axios'
import { QK } from 'contants/query'
import { _t } from 'contexts/i18n'
import { NotificationTab } from 'models/notification'
import type { IQueryNotifications } from 'pages/Notification'
import React, { useCallback, useEffect } from 'react'
import { useInfiniteQuery, useMutation } from 'react-query'
import { getApiUrl } from 'services'
import { toastSuccess } from 'utils/toast'
interface IUseInfinitiveScroll {
  size: number
  query?: IQueryNotifications
  dependency?: boolean
  enabled?: any
}

export const useInfinitiveScroll = (props: IUseInfinitiveScroll) => {
  const { size, query, dependency, enabled } = props
  // infinitive scroll
  const observerElem =
    React.useRef() as React.MutableRefObject<HTMLInputElement>

  const markReadedNotificationMutation = useMutation({
    mutationFn: postNotificationsMarkRead,
    onSuccess: () => {
      toastSuccess(_t('notification.toast.success'))
    }
  })

  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [
        QK.NOTIFICATION,
        query,
        markReadedNotificationMutation,
        dependency
      ],
      queryFn: async ({ pageParam = 1 }) => {
        const { data } = await axios({
          method: 'GET',
          url: getApiUrl('/notifications'),
          params: {
            page: pageParam,
            size: size,
            isRead:
              query?._subTab == NotificationTab.ALL_NOTICE ? undefined : false
          }
        })
        return data?.results
      },
      getNextPageParam: (lastPage: any, pages) => {
        const nextPage = pages.length + 1
        return lastPage.length !== 0 ? nextPage : undefined
      },
      enabled: enabled
    })

  const handleObserver = useCallback(
    (entries: any) => {
      const [target] = entries
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage()
      }
    },
    [fetchNextPage, hasNextPage]
  )

  useEffect(() => {
    const element = observerElem.current
    if (!element) {
      return
    }
    const option = { threshold: 0 }

    const observer = new IntersectionObserver(handleObserver, option)
    observer.observe(element)
    return () => observer.unobserve(element)
  }, [fetchNextPage, hasNextPage, handleObserver, observerElem])

  return {
    data,
    isSuccess,
    observerElem,
    isFetchingNextPage,
    markReadedNotificationMutation
  }
}
