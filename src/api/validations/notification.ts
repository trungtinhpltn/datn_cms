import { _t } from 'contexts/i18n'

export const getNotificationsSchema = {
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
      type: {
        type: 'string',
        enum: ['update', 'assign'],
        errorMessage: { enum: _t('validate.type.enum') }
      },
      isRead: {
        type: 'boolean'
      }
    }
  }
}

export const postNotificationsMarkReadSchema = {
  body: {
    type: 'object',
    required: ['notificationIds'],
    properties: {
      notificationIds: {
        type: 'array',
        items: { type: 'string' }
      }
    }
  }
}
