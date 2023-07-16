import { _t } from 'contexts/i18n'

export const postProjectByIdApiKeySchema = {
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

export const deleteProjectByIdApiKeySchema = {
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

export const getProjectsSchema = {
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
      }
    }
  }
}

export const postProjectsSchema = {
  body: {
    type: 'object',
    required: ['name', 'categories'],
    properties: {
      name: {
        type: 'string',
        maxLength: 200,
        errorMessage: { maxLength: _t('validate.name.maxLength') }
      },
      categories: {
        type: 'array',
        items: {
          type: 'string',
          maxLength: 200,
          errorMessage: { maxLength: _t('validate.categories.items.maxLength') }
        }
      },
      isDefault: {
        type: 'boolean'
      }
    }
  }
}

export const postProjectsAddChannelSchema = {
  body: {
    type: 'object',
    required: ['projectId'],
    properties: {
      id: {
        type: 'string'
      },
      projectId: {
        type: 'string'
      }
    }
  }
}

export const postProjectsAddMemberSchema = {
  body: {
    type: 'object',
    required: ['userId', 'projectId'],
    properties: {
      userId: {
        type: 'array',
        items: { type: 'string' }
      },
      role: {
        type: 'string',
        enum: ['admin', 'agent', 'supervisor', 'leaved'],
        errorMessage: { enum: _t('validate.role.enum') }
      },
      projectId: {
        type: 'string'
      }
    }
  }
}

export const getProjectByIdSchema = {
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

export const putProjectByIdSchema = {
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        maxLength: 200,
        errorMessage: { maxLength: _t('validate.name.maxLength') }
      },
      categories: {
        type: 'array',
        items: {
          type: 'string',
          maxLength: 200,
          errorMessage: { maxLength: _t('validate.categories.items.maxLength') }
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

export const deleteProjectByIdSchema = {
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
