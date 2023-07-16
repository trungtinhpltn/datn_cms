import axios from 'axios'

export async function getSystemsAgentCheck(payload: {
  page?: number
  size?: number
  projectId?: string
  isOnline?: boolean
  state?: UserState
}): Promise<GetSystemsAgentCheckResponse> {
  const { page, size, projectId, isOnline, state } = payload
  const { data } = await axios({
    url: '/systems/agent-check',
    method: 'GET',
    params: { page, size, projectId, isOnline, state }
  })
  return data
}

export async function getSystemsChatCheck(payload: {
  page?: number
  size?: number
  projectId?: string
  status?: TicketStatus
}): Promise<GetSystemsChatCheckResponse> {
  const { page, size, projectId, status } = payload
  const { data } = await axios({
    url: '/systems/chat-check',
    method: 'GET',
    params: { page, size, projectId, status }
  })
  return data
}

export async function getSystemsHealthCheck(): Promise<GetSystemsHealthCheckResponse> {
  const { data } = await axios({
    url: '/systems/health-check',
    method: 'GET'
  })
  return data
}

export async function getSystemsQueueCheck(payload: {
  page?: number
  size?: number
  projectId?: string
}): Promise<GetSystemsQueueCheckResponse> {
  const { page, size, projectId } = payload
  const { data } = await axios({
    url: '/systems/queue-check',
    method: 'GET',
    params: { page, size, projectId }
  })
  return data
}
