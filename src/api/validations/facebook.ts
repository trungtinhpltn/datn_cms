export const getFacebookConnectSchema = {
  querystring: {
    type: 'object',
    required: ['facebookAppId', 'token'],
    properties: {
      facebookAppId: {
        type: 'string'
      },
      token: {
        type: 'string'
      }
    }
  }
}

export const facebookGetMessageFacebookSchema = {
  querystring: {
    type: 'object',
    properties: {
      ticketId: {
        type: 'string'
      }
    }
  }
}

export const facebookGetTokenSchema = {
  body: {
    type: 'object',
    properties: {
      channelCrmId: {
        type: 'string'
      }
    }
  }
}

export const postFacebookSendMessageSchema = {
  body: {
    type: 'object',
    required: ['ticketId', 'message'],
    properties: {
      ticketId: {
        type: 'string'
      },
      message: {
        type: 'string'
      }
    }
  }
}

export const postFacebookSocketAuthenticationSchema = {
  body: {
    type: 'object',
    required: ['userId'],
    properties: {
      userId: {
        type: 'string'
      }
    }
  }
}

export const facebookGetTicketByConversationSchema = {
  querystring: {
    type: 'object',
    properties: {
      conversationId: {
        type: 'string'
      }
    }
  }
}
