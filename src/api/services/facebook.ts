import axios from 'axios'

export async function getFacebookConnect(payload: {
  facebookAppId: string
  token: string
}): Promise<GetFacebookConnectResponse> {
  const { facebookAppId, token } = payload
  const { data } = await axios({
    url: '/facebook/connect',
    method: 'GET',
    params: { facebookAppId, token }
  })
  return data
}

export async function facebookGetMessageFacebook(payload: {
  ticketId?: string
}): Promise<FacebookGetMessageFacebookResponse> {
  const { ticketId } = payload
  const { data } = await axios({
    url: '/facebook/get-message-facebook',
    method: 'GET',
    params: { ticketId }
  })
  return data
}

export async function facebookGetToken(payload: {
  channelCrmId?: string
}): Promise<FacebookGetTokenResponse> {
  const { channelCrmId } = payload
  const { data } = await axios({
    url: '/facebook/get-token',
    method: 'POST',
    data: { channelCrmId }
  })
  return data
}

export async function postFacebookSendMessage(payload: {
  ticketId: string
  message: string
}): Promise<PostFacebookSendMessageResponse> {
  const { ticketId, message } = payload
  const { data } = await axios({
    url: '/facebook/send-message',
    method: 'POST',
    data: { ticketId, message }
  })
  return data
}

export async function postFacebookSocketAuthentication(payload: {
  userId: string
}): Promise<PostFacebookSocketAuthenticationResponse> {
  const { userId } = payload
  const { data } = await axios({
    url: '/facebook/socket-authentication',
    method: 'POST',
    data: { userId }
  })
  return data
}

export async function facebookGetTicketByConversation(payload: {
  conversationId?: string
}): Promise<FacebookGetTicketByConversationResponse> {
  const { conversationId } = payload
  const { data } = await axios({
    url: '/facebook/get-ticket-by-conversation',
    method: 'GET',
    params: { conversationId }
  })
  return data
}
