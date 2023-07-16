export const getChatsSchema = {
  querystring: {
    type: 'object',
    required: ['ticketId'],
    properties: {
      ticketId: {
        type: 'string'
      }
    }
  }
}

export const postChatsSchema = {
  body: {
    type: 'object',
    required: ['content', 'ticketId'],
    properties: {
      ticketId: {
        type: 'string'
      },
      content: {
        type: 'string'
      }
    }
  }
}

export const getChatByIdSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'string'
      }
    }
  }
}
