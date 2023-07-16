import { _t } from 'contexts/i18n'

export const getTicketByIdLogSchema = {
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

export const getTicketsSchema = {
  querystring: {
    type: 'object',
    properties: {
      page: {
        type: 'integer',
        minimum: 1,
        errorMessage: { minimum: _t('validate.page.minimum') }
      },
      size: {
        type: 'integer',
        minimum: 1,
        errorMessage: { minimum: _t('validate.size.minimum') }
      },
      q: {
        type: 'string'
      },
      projectId: {
        type: 'string'
      },
      status: {
        type: 'string',
        enum: ['done', 'waiting', 'working', 'new'],
        errorMessage: { enum: _t('validate.status.enum') }
      },
      channel: {
        type: 'string',
        enum: ['fb', 'zalo', 'live', 'email'],
        errorMessage: { enum: _t('validate.channel.enum') }
      },
      fromDate: {
        type: 'string'
      },
      toDate: {
        type: 'string'
      }
    }
  }
}

export const postTicketsSchema = {
  body: {
    type: 'object',
    required: ['channel', 'customerId', 'name'],
    properties: {
      name: {
        type: 'string',
        minLength: 2,
        maxLength: 50,
        errorMessage: {
          minLength: _t('validate.name.minLength'),
          maxLength: _t('validate.name.maxLength')
        }
      },
      content: {
        type: 'string',
        minLength: 4,
        maxLength: 5000,
        errorMessage: {
          minLength: _t('validate.content.minLength'),
          maxLength: _t('validate.content.maxLength')
        }
      },
      categories: {
        type: 'array',
        items: {
          type: 'string',
          minLength: 2,
          maxLength: 200,
          errorMessage: {
            minLength: _t('validate.categories.items.minLength'),
            maxLength: _t('validate.categories.items.maxLength')
          }
        }
      },
      email: {
        type: 'string'
      },
      phoneNumber: {
        type: 'string'
      },
      customerId: {
        type: 'string',
        minLength: 4,
        maxLength: 50,
        errorMessage: {
          minLength: _t('validate.customerId.minLength'),
          maxLength: _t('validate.customerId.maxLength')
        }
      },
      channel: {
        type: 'string',
        enum: ['fb', 'zalo', 'live', 'email'],
        errorMessage: { enum: _t('validate.channel.enum') }
      },
      channelId: {
        type: 'string'
      }
    }
  }
}

export const deleteTicketsSchema = {
  body: {
    type: 'object',
    properties: {
      ids: {
        type: 'array',
        items: { type: 'string' }
      }
    }
  }
}

export const getTicketsExportsSchema = {
  querystring: {
    type: 'object',
    required: ['email'],
    properties: {
      page: {
        type: 'integer',
        minimum: 1,
        errorMessage: { minimum: _t('validate.page.minimum') }
      },
      size: {
        type: 'integer',
        minimum: 1,
        errorMessage: { minimum: _t('validate.size.minimum') }
      },
      q: {
        type: 'string'
      },
      projectId: {
        type: 'string'
      },
      status: {
        type: 'string',
        enum: ['done', 'waiting', 'working', 'new'],
        errorMessage: { enum: _t('validate.status.enum') }
      },
      channel: {
        type: 'string',
        enum: ['fb', 'zalo', 'live', 'email'],
        errorMessage: { enum: _t('validate.channel.enum') }
      },
      fromDate: {
        type: 'string'
      },
      toDate: {
        type: 'string'
      },
      email: {
        type: 'string',
        maxLength: 255,
        errorMessage: { maxLength: _t('validate.email.maxLength') }
      }
    }
  }
}

export const getTicketByIdSchema = {
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

export const putTicketByIdSchema = {
  body: {
    type: 'object',
    properties: {
      note: {
        type: 'string',
        minLength: 2,
        maxLength: 1000,
        errorMessage: {
          minLength: _t('validate.note.minLength'),
          maxLength: _t('validate.note.maxLength')
        }
      },
      status: {
        type: 'string',
        enum: ['done', 'waiting', 'working', 'new'],
        errorMessage: { enum: _t('validate.status.enum') }
      },
      memberId: {
        type: 'string',
        minLength: 4,
        maxLength: 50,
        errorMessage: {
          minLength: _t('validate.memberId.minLength'),
          maxLength: _t('validate.memberId.maxLength')
        }
      },
      categories: {
        type: 'array',
        items: {
          type: 'string',
          minLength: 2,
          maxLength: 200,
          errorMessage: {
            minLength: _t('validate.categories.items.minLength'),
            maxLength: _t('validate.categories.items.maxLength')
          }
        }
      }
    }
  },
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

export const deleteTicketByIdSchema = {
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
