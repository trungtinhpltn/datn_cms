import axios from 'axios'

export async function getChats(payload: {
  ticketId: string
}): Promise<GetChatsResponse> {
  const { ticketId } = payload
  const { data } = await axios({
    url: '/chats',
    method: 'GET',
    params: { ticketId }
  })
  return data
}

export async function postChats(payload: {
  ticketId: string
  content: string
}): Promise<PostChatsResponse> {
  const { ticketId, content } = payload
  const { data } = await axios({
    url: '/chats',
    method: 'POST',
    data: { ticketId, content }
  })
  return data
}

export async function getChatById(payload: {
  id: string
}): Promise<GetChatByIdResponse> {
  const { id } = payload
  const { data } = await axios({
    url: `/chats/${id}`,
    method: 'GET'
  })
  return data
}
