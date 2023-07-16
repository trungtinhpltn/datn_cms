import { _t } from 'contexts/i18n'

export const getPermissionsSchema = {
  querystring: {
    type: 'object',
    required: ['role'],
    properties: {
      role: {
        type: 'string'
      }
    }
  }
}

export const postPermissionsSchema = {
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string'
      }
    }
  }
}

export const deletePermissionsSchema = {
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string'
      }
    }
  }
}

export const putPermissionByIdSchema = {
  body: {
    type: 'object',
    properties: {
      effect: {
        type: 'string',
        enum: ['allow', 'deny'],
        errorMessage: { enum: _t('validate.effect.enum') }
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
