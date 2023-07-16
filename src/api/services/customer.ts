import axios from 'axios'

export async function getCustomers(payload: {
  q?: string
  type?: CustomerType
  page?: number
  size?: number
}): Promise<GetCustomersResponse> {
  const { q, type, page, size } = payload
  const { data } = await axios({
    url: '/customers',
    method: 'GET',
    params: { q, type, page, size }
  })
  return data
}

export async function postCustomers(payload: {
  name: string
  type?: CustomerType
  accountManagement?: string
  phoneNumber?: string
  email?: string
  socials?: string[]
}): Promise<PostCustomersResponse> {
  const { name, type, accountManagement, phoneNumber, email, socials } = payload
  const { data } = await axios({
    url: '/customers',
    method: 'POST',
    data: { name, type, accountManagement, phoneNumber, email, socials }
  })
  return data
}

export async function getCustomersExports(payload: {
  q?: string
  type?: CustomerType
  page?: number
  size?: number
  email: string
}): Promise<GetCustomersExportsResponse> {
  const { q, type, page, size, email } = payload
  const { data } = await axios({
    url: '/customers/exports',
    method: 'GET',
    params: { q, type, page, size, email }
  })
  return data
}

export async function getCustomersHistoryChange(payload: {
  customerId: string
  page?: number
  size?: number
}): Promise<GetCustomersHistoryChangeResponse> {
  const { customerId, page, size } = payload
  const { data } = await axios({
    url: '/customers/historyChange',
    method: 'GET',
    params: { customerId, page, size }
  })
  return data
}

export async function getCustomerById(payload: {
  id: string
}): Promise<GetCustomerByIdResponse> {
  const { id } = payload
  const { data } = await axios({
    url: `/customers/${id}`,
    method: 'GET'
  })
  return data
}

export async function putCustomerById(payload: {
  id: string
  name?: string
  type?: CustomerType
  accountManagement?: string
  phoneNumber?: string
  email?: string
  socials?: string[]
}): Promise<PutCustomerByIdResponse> {
  const { id, name, type, accountManagement, phoneNumber, email, socials } =
    payload
  const { data } = await axios({
    url: `/customers/${id}`,
    method: 'PUT',
    data: { name, type, accountManagement, phoneNumber, email, socials }
  })
  return data
}

export async function deleteCustomerById(payload: {
  id: string
}): Promise<DeleteCustomerByIdResponse> {
  const { id } = payload
  const { data } = await axios({
    url: `/customers/${id}`,
    method: 'DELETE'
  })
  return data
}

export async function getCustomersNotes(payload: {
  customerId: string
  page?: number
  size?: number
}): Promise<GetCustomersNotesResponse> {
  const { customerId, page, size } = payload
  const { data } = await axios({
    url: '/customers/notes',
    method: 'GET',
    params: { customerId, page, size }
  })
  return data
}

export async function postCustomersNotes(payload: {
  customerId: string
  title: string
  content: string
}): Promise<PostCustomersNotesResponse> {
  const { customerId, title, content } = payload
  const { data } = await axios({
    url: '/customers/notes',
    method: 'POST',
    data: { customerId, title, content }
  })
  return data
}

export async function getCustomerNoteById(payload: {
  id: string
}): Promise<GetCustomerNoteByIdResponse> {
  const { id } = payload
  const { data } = await axios({
    url: `/customers/notes/${id}`,
    method: 'GET'
  })
  return data
}

export async function deleteCustomerNoteById(payload: {
  id: string
}): Promise<DeleteCustomerNoteByIdResponse> {
  const { id } = payload
  const { data } = await axios({
    url: `/customers/notes/${id}`,
    method: 'DELETE'
  })
  return data
}

export async function getCustomersTickets(payload: {
  customerId: string
  page?: number
  size?: number
}): Promise<GetCustomersTicketsResponse> {
  const { customerId, page, size } = payload
  const { data } = await axios({
    url: '/customers/tickets',
    method: 'GET',
    params: { customerId, page, size }
  })
  return data
}

export async function postCustomersDeleteMany(payload: {
  ids?: string[]
}): Promise<PostCustomersDeleteManyResponse> {
  const { ids } = payload
  const { data } = await axios({
    url: '/customers/deleteMany',
    method: 'POST',
    data: { ids }
  })
  return data
}
