import axios from 'axios'

export async function getTicketByIdLog(payload: {
  id: string
}): Promise<GetTicketByIdLogResponse> {
  const { id } = payload
  const { data } = await axios({
    url: `/tickets/${id}/log`,
    method: 'GET'
  })
  return data
}

export async function getTickets(payload: {
  page?: number
  size?: number
  q?: string
  projectId?: string
  status?: TicketStatus
  channel?: CustomerChannel
  fromDate?: string
  toDate?: string
}): Promise<GetTicketsResponse> {
  const { page, size, q, projectId, status, channel, fromDate, toDate } =
    payload
  const { data } = await axios({
    url: '/tickets',
    method: 'GET',
    params: { page, size, q, projectId, status, channel, fromDate, toDate }
  })
  return data
}

export async function postTickets(payload: {
  name: string
  content?: string
  categories?: string[]
  email?: string
  phoneNumber?: string
  customerId: string
  channel: CustomerChannel
  channelId?: string
}): Promise<PostTicketsResponse> {
  const {
    name,
    content,
    categories,
    email,
    phoneNumber,
    customerId,
    channel,
    channelId
  } = payload
  const { data } = await axios({
    url: '/tickets',
    method: 'POST',
    data: {
      name,
      content,
      categories,
      email,
      phoneNumber,
      customerId,
      channel,
      channelId
    }
  })
  return data
}

export async function deleteTickets(payload: {
  ids?: string[]
}): Promise<DeleteTicketsResponse> {
  const { ids } = payload
  const { data } = await axios({
    url: '/tickets',
    method: 'DELETE',
    data: { ids }
  })
  return data
}

export async function getTicketsExports(payload: {
  page?: number
  size?: number
  q?: string
  projectId?: string
  status?: TicketStatus
  channel?: CustomerChannel
  fromDate?: string
  toDate?: string
  email: string
}): Promise<GetTicketsExportsResponse> {
  const { page, size, q, projectId, status, channel, fromDate, toDate, email } =
    payload
  const { data } = await axios({
    url: '/tickets/exports',
    method: 'GET',
    params: {
      page,
      size,
      q,
      projectId,
      status,
      channel,
      fromDate,
      toDate,
      email
    }
  })
  return data
}

export async function getTicketById(payload: {
  id: string
}): Promise<GetTicketByIdResponse> {
  const { id } = payload
  const { data } = await axios({
    url: `/tickets/${id}`,
    method: 'GET'
  })
  return data
}

export async function putTicketById(payload: {
  id: string
  note?: string
  status?: TicketStatus
  memberId?: string
  categories?: string[]
}): Promise<PutTicketByIdResponse> {
  const { id, note, status, memberId, categories } = payload
  const { data } = await axios({
    url: `/tickets/${id}`,
    method: 'PUT',
    data: { note, status, memberId, categories }
  })
  return data
}

export async function deleteTicketById(payload: {
  id: string
}): Promise<DeleteTicketByIdResponse> {
  const { id } = payload
  const { data } = await axios({
    url: `/tickets/${id}`,
    method: 'DELETE'
  })
  return data
}
