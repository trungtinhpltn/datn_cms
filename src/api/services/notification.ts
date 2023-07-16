import axios from 'axios'

export async function getNotifications(payload: {
  page?: number
  size?: number
  type?: TypeNotification
  isRead?: boolean
}): Promise<GetNotificationsResponse> {
  const { page, size, type, isRead } = payload
  const { data } = await axios({
    url: '/notifications',
    method: 'GET',
    params: { page, size, type, isRead }
  })
  return data
}

export async function getNotificationsCountUnread(): Promise<GetNotificationsCountUnreadResponse> {
  const { data } = await axios({
    url: '/notifications/count-unread',
    method: 'GET'
  })
  return data
}

export async function postNotificationsMarkRead(payload: {
  notificationIds: string[]
}): Promise<PostNotificationsMarkReadResponse> {
  const { notificationIds } = payload
  const { data } = await axios({
    url: '/notifications/mark-read',
    method: 'POST',
    data: { notificationIds }
  })
  return data
}
