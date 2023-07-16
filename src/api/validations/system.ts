import { _t } from 'contexts/i18n'

export const getSystemsAgentCheckSchema = {
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
      isOnline: {
        type: 'boolean'
      },
      state: {
        type: 'string',
        enum: ['busy', 'free'],
        errorMessage: { enum: _t('validate.state.enum') }
      }
    }
  }
}

export const getSystemsChatCheckSchema = {
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
      status: {
        type: 'string',
        enum: ['done', 'waiting', 'working', 'new'],
        errorMessage: { enum: _t('validate.status.enum') }
      }
    }
  }
}

export const getSystemsQueueCheckSchema = {
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
      }
    }
  }
}
