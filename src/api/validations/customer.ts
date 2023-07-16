import { _t } from 'contexts/i18n'

export const getCustomersSchema = {
  querystring: {
    type: 'object',
    properties: {
      q: {
        type: 'string',
        minLength: 1,
        maxLength: 30,
        errorMessage: {
          minLength: _t('validate.q.minLength'),
          maxLength: _t('validate.q.maxLength')
        }
      },
      type: {
        type: 'string',
        enum: ['super_vip', 'vip', 'normal', 'leaved'],
        errorMessage: { enum: _t('validate.type.enum') }
      },
      page: {
        type: 'integer',
        minimum: 1,
        errorMessage: { minimum: _t('validate.page.minimum') }
      },
      size: {
        type: 'integer',
        minimum: 1,
        errorMessage: { minimum: _t('validate.size.minimum') }
      }
    }
  }
}

export const postCustomersSchema = {
  body: {
    type: 'object',
    required: ['name'],
    properties: {
      name: {
        type: 'string',
        maxLength: 255,
        errorMessage: { maxLength: _t('validate.name.maxLength') }
      },
      type: {
        type: 'string',
        enum: ['super_vip', 'vip', 'normal', 'leaved'],
        errorMessage: { enum: _t('validate.type.enum') }
      },
      accountManagement: {
        type: 'string',
        maxLength: 255,
        errorMessage: { maxLength: _t('validate.accountManagement.maxLength') }
      },
      phoneNumber: {
        type: 'string',
        maxLength: 12,
        pattern: '(84|0[3|5|7|8|9])+([0-9]{8})',
        errorMessage: {
          maxLength: _t('validate.phoneNumber.maxLength'),
          pattern: _t('validate.phoneNumber.pattern')
        }
      },
      email: {
        type: 'string',
        maxLength: 40,
        format: 'email',
        errorMessage: {
          maxLength: _t('validate.email.maxLength'),
          format: _t('validate.email.format')
        }
      },
      socials: {
        type: 'array',
        items: {
          type: 'string',
          maxLength: 255,
          errorMessage: { maxLength: _t('validate.socials.items.maxLength') }
        }
      }
    }
  }
}

export const getCustomersExportsSchema = {
  querystring: {
    type: 'object',
    required: ['email'],
    properties: {
      q: {
        type: 'string',
        minLength: 1,
        maxLength: 30,
        errorMessage: {
          minLength: _t('validate.q.minLength'),
          maxLength: _t('validate.q.maxLength')
        }
      },
      type: {
        type: 'string',
        enum: ['super_vip', 'vip', 'normal', 'leaved'],
        errorMessage: { enum: _t('validate.type.enum') }
      },
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
      email: {
        type: 'string',
        maxLength: 255,
        errorMessage: { maxLength: _t('validate.email.maxLength') }
      }
    }
  }
}

export const getCustomersHistoryChangeSchema = {
  querystring: {
    type: 'object',
    required: ['customerId'],
    properties: {
      customerId: {
        type: 'string'
      },
      page: {
        type: 'integer',
        minimum: 1,
        errorMessage: { minimum: _t('validate.page.minimum') }
      },
      size: {
        type: 'integer',
        minimum: 1,
        errorMessage: { minimum: _t('validate.size.minimum') }
      }
    }
  }
}

export const getCustomerByIdSchema = {
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

export const putCustomerByIdSchema = {
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string'
      },
      type: {
        type: 'string',
        enum: ['super_vip', 'vip', 'normal', 'leaved'],
        errorMessage: { enum: _t('validate.type.enum') }
      },
      accountManagement: {
        type: 'string',
        maxLength: 255,
        errorMessage: { maxLength: _t('validate.accountManagement.maxLength') }
      },
      phoneNumber: {
        type: 'string',
        maxLength: 12,
        pattern: '(84|0[3|5|7|8|9])+([0-9]{8})',
        errorMessage: {
          maxLength: _t('validate.phoneNumber.maxLength'),
          pattern: _t('validate.phoneNumber.pattern')
        }
      },
      email: {
        type: 'string'
      },
      socials: {
        type: 'array',
        items: { type: 'string' }
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

export const deleteCustomerByIdSchema = {
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

export const getCustomersNotesSchema = {
  querystring: {
    type: 'object',
    required: ['customerId'],
    properties: {
      customerId: {
        type: 'string'
      },
      page: {
        type: 'integer',
        minimum: 1,
        errorMessage: { minimum: _t('validate.page.minimum') }
      },
      size: {
        type: 'integer',
        minimum: 1,
        errorMessage: { minimum: _t('validate.size.minimum') }
      }
    }
  }
}

export const postCustomersNotesSchema = {
  body: {
    type: 'object',
    required: ['customerId', 'title', 'content'],
    properties: {
      customerId: {
        type: 'string'
      },
      title: {
        type: 'string',
        maxLength: 255,
        errorMessage: { maxLength: _t('validate.title.maxLength') }
      },
      content: {
        type: 'string',
        maxLength: 1000,
        errorMessage: { maxLength: _t('validate.content.maxLength') }
      }
    }
  }
}

export const getCustomerNoteByIdSchema = {
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

export const deleteCustomerNoteByIdSchema = {
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

export const getCustomersTicketsSchema = {
  querystring: {
    type: 'object',
    required: ['customerId'],
    properties: {
      customerId: {
        type: 'string'
      },
      page: {
        type: 'integer',
        minimum: 1,
        errorMessage: { minimum: _t('validate.page.minimum') }
      },
      size: {
        type: 'integer',
        minimum: 1,
        errorMessage: { minimum: _t('validate.size.minimum') }
      }
    }
  }
}

export const postCustomersDeleteManySchema = {
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
