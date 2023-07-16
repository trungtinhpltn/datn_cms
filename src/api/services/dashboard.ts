import axios from 'axios'

export async function getDashboardChartsTicket(payload: {
  startAt?: string
  finishAt?: string
}): Promise<GetDashboardChartsTicketResponse> {
  const { startAt, finishAt } = payload
  const { data } = await axios({
    url: '/dashboard/charts-ticket',
    method: 'GET',
    params: { startAt, finishAt }
  })
  return data
}

export async function getDashboardDeleteTicket(payload: {
  page?: number
  size?: number
  startAt?: string
  finishAt?: string
}): Promise<GetDashboardDeleteTicketResponse> {
  const { page, size, startAt, finishAt } = payload
  const { data } = await axios({
    url: '/dashboard/delete-ticket',
    method: 'GET',
    params: { page, size, startAt, finishAt }
  })
  return data
}

export async function getDashboardExports(payload: {
  channel?: CustomerChannel
  status?: TicketStatus
  startAt?: string
  finishAt?: string
  email: string
}): Promise<GetDashboardExportsResponse> {
  const { channel, status, startAt, finishAt, email } = payload
  const { data } = await axios({
    url: '/dashboard/exports',
    method: 'GET',
    params: { channel, status, startAt, finishAt, email }
  })
  return data
}

export async function getDashboardReportTicket(payload: {
  channel?: CustomerChannel
  status?: TicketStatus
  startAt?: string
  finishAt?: string
}): Promise<GetDashboardReportTicketResponse> {
  const { channel, status, startAt, finishAt } = payload
  const { data } = await axios({
    url: '/dashboard/report-ticket',
    method: 'GET',
    params: { channel, status, startAt, finishAt }
  })
  return data
}
