import { _t } from 'contexts/i18n'

export const getDashboardChartsTicketSchema = {
  querystring: {
    type: 'object',
    properties: {
      startAt: {
        type: 'string',
        format: 'date',
        errorMessage: { format: _t('validate.startAt.format') }
      },
      finishAt: {
        type: 'string',
        format: 'date',
        errorMessage: { format: _t('validate.finishAt.format') }
      }
    }
  }
}

export const getDashboardDeleteTicketSchema = {
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
      startAt: {
        type: 'string',
        format: 'date',
        errorMessage: { format: _t('validate.startAt.format') }
      },
      finishAt: {
        type: 'string',
        format: 'date',
        errorMessage: { format: _t('validate.finishAt.format') }
      }
    }
  }
}

export const getDashboardExportsSchema = {
  querystring: {
    type: 'object',
    required: ['email'],
    properties: {
      channel: {
        type: 'string',
        enum: ['fb', 'zalo', 'live', 'email'],
        errorMessage: { enum: _t('validate.channel.enum') }
      },
      status: {
        type: 'string',
        enum: ['done', 'waiting', 'working', 'new'],
        errorMessage: { enum: _t('validate.status.enum') }
      },
      startAt: {
        type: 'string',
        format: 'date',
        errorMessage: { format: _t('validate.startAt.format') }
      },
      finishAt: {
        type: 'string',
        format: 'date',
        errorMessage: { format: _t('validate.finishAt.format') }
      },
      email: {
        type: 'string',
        maxLength: 255,
        errorMessage: { maxLength: _t('validate.email.maxLength') }
      }
    }
  }
}

export const getDashboardReportTicketSchema = {
  querystring: {
    type: 'object',
    properties: {
      channel: {
        type: 'string',
        enum: ['fb', 'zalo', 'live', 'email'],
        errorMessage: { enum: _t('validate.channel.enum') }
      },
      status: {
        type: 'string',
        enum: ['done', 'waiting', 'working', 'new'],
        errorMessage: { enum: _t('validate.status.enum') }
      },
      startAt: {
        type: 'string',
        format: 'date',
        errorMessage: { format: _t('validate.startAt.format') }
      },
      finishAt: {
        type: 'string',
        format: 'date',
        errorMessage: { format: _t('validate.finishAt.format') }
      }
    }
  }
}
