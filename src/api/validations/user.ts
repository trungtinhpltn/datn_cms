import { _t } from 'contexts/i18n'

export const postUserByIdChangeProjectRoleSchema = {
  body: {
    type: 'object',
    properties: {
      role: {
        type: 'string',
        enum: ['admin', 'agent', 'supervisor', 'leaved'],
        errorMessage: { enum: _t('validate.role.enum') }
      },
      projectIds: {
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

export const postUsersSchema = {
  body: {
    type: 'object',
    required: ['name', 'email', 'role'],
    properties: {
      name: {
        type: 'string'
      },
      email: {
        type: 'string'
      },
      projectIds: {
        type: 'array',
        items: { type: 'string' }
      },
      role: {
        type: 'string',
        enum: ['admin', 'agent', 'supervisor', 'leaved'],
        errorMessage: { enum: _t('validate.role.enum') }
      },
      phoneNumber: {
        type: 'string',
        maxLength: 12,
        pattern: '(84|0[3|5|7|8|9])+([0-9]{8})',
        errorMessage: {
          maxLength: _t('validate.phoneNumber.maxLength'),
          pattern: _t('validate.phoneNumber.pattern')
        }
      }
    }
  }
}

export const getUsersSchema = {
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
      projectId: {
        type: 'string'
      },
      q: {
        type: 'string'
      },
      role: {
        type: 'string',
        enum: ['admin', 'agent', 'supervisor', 'leaved'],
        errorMessage: { enum: _t('validate.role.enum') }
      }
    }
  }
}

export const getUsersExportsSchema = {
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
      projectId: {
        type: 'string'
      },
      q: {
        type: 'string'
      },
      role: {
        type: 'string',
        enum: ['admin', 'agent', 'supervisor', 'leaved'],
        errorMessage: { enum: _t('validate.role.enum') }
      },
      email: {
        type: 'string',
        maxLength: 255,
        errorMessage: { maxLength: _t('validate.email.maxLength') }
      }
    }
  }
}

export const getUserByIdSchema = {
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

export const putUserByIdSchema = {
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string'
      },
      projectIds: {
        type: 'array',
        items: { type: 'string' }
      },
      role: {
        type: 'string',
        enum: ['admin', 'agent', 'supervisor', 'leaved'],
        errorMessage: { enum: _t('validate.role.enum') }
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
      avatar: {
        type: 'string'
      },
      active: {
        type: 'boolean'
      },
      isNotification: {
        type: 'boolean'
      },
      state: {
        type: 'string',
        enum: ['busy', 'free'],
        errorMessage: { enum: _t('validate.state.enum') }
      },
      isOnline: {
        type: 'boolean'
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

export const deleteUserByIdSchema = {
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
