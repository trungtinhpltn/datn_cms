import { _t } from 'contexts/i18n'

export const getSettingsSchema = {
  querystring: {
    type: 'object',
    properties: {
      q: {
        type: 'string'
      },
      settingType: {
        type: 'string',
        enum: ['trigger', 'sla'],
        errorMessage: { enum: _t('validate.settingType.enum') }
      },
      active: {
        type: 'boolean'
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

export const postSettingsSchema = {
  body: {
    type: 'object',
    required: ['settingType', 'name', 'isFullCondition'],
    properties: {
      name: {
        type: 'string'
      },
      settingType: {
        type: 'string',
        enum: ['trigger', 'sla'],
        errorMessage: { enum: _t('validate.settingType.enum') }
      },
      isFullCondition: {
        type: 'boolean'
      },
      conditions: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            conditionType: {
              type: 'string',
              enum: [
                'ticket_status',
                'ticket_assignee',
                'customer_type',
                'channel',
                'email_from',
                'ticket_title',
                'working_time',
                'assigned_time',
                'new_time',
                'doing_time',
                'waiting_time'
              ]
            },
            op: {
              type: 'string',
              enum: [
                'is',
                'not',
                'change',
                'includes',
                'not_includes',
                'lt',
                'gt'
              ]
            },
            value: { type: 'string' },
            settingId: { type: 'string' }
          },
          required: ['conditionType', 'value', 'op'],
          errorMessage: {
            properties: _t('validate.conditions.items.properties'),
            required: _t('validate.conditions.items.required')
          }
        }
      },
      actions: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            actionType: {
              type: 'string',
              enum: ['change_status', 'change_assignee', 'send_email']
            },
            value: { type: 'string' },
            title: { type: 'string', maxLength: 200 },
            content: { type: 'string', maxLength: 2000 },
            settingId: { type: 'string' }
          },
          required: ['actionType', 'value'],
          errorMessage: {
            properties: _t('validate.actions.items.properties'),
            required: _t('validate.actions.items.required')
          }
        }
      }
    }
  }
}

export const putSettingsAssignTicketSchema = {
  body: {
    type: 'object',
    properties: {
      isAutoAssign: {
        type: 'boolean'
      },
      memberAssignType: {
        type: 'string',
        enum: ['admin', 'agent', 'supervisor', 'leaved'],
        errorMessage: { enum: _t('validate.memberAssignType.enum') }
      },
      isFree: {
        type: 'boolean'
      },
      maxTicket: {
        type: 'integer',
        maximum: 99,
        minimum: 0,
        errorMessage: {
          maximum: _t('validate.maxTicket.maximum'),
          minimum: _t('validate.maxTicket.minimum')
        }
      },
      isSmallerTicket: {
        type: 'boolean'
      },
      isEndTicketSoon: {
        type: 'boolean'
      }
    }
  }
}

export const getSettingByIdSchema = {
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

export const deleteSettingByIdSchema = {
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

export const putSettingByIdSchema = {
  body: {
    type: 'object',
    required: ['settingType', 'name', 'isFullCondition'],
    properties: {
      name: {
        type: 'string'
      },
      active: {
        type: 'boolean'
      },
      settingType: {
        type: 'string',
        enum: ['trigger', 'sla'],
        errorMessage: { enum: _t('validate.settingType.enum') }
      },
      isFullCondition: {
        type: 'boolean'
      },
      conditions: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            conditionType: {
              type: 'string',
              enum: [
                'ticket_status',
                'ticket_assignee',
                'customer_type',
                'channel',
                'email_from',
                'ticket_title',
                'working_time',
                'assigned_time',
                'new_time',
                'doing_time',
                'waiting_time'
              ]
            },
            op: {
              type: 'string',
              enum: [
                'is',
                'not',
                'change',
                'includes',
                'not_includes',
                'lt',
                'gt'
              ]
            },
            value: { type: 'string' },
            settingId: { type: 'string' }
          },
          required: ['conditionType', 'value', 'op'],
          errorMessage: {
            properties: _t('validate.conditions.items.properties'),
            required: _t('validate.conditions.items.required')
          }
        }
      },
      actions: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            actionType: {
              type: 'string',
              enum: ['change_status', 'change_assignee', 'send_email']
            },
            value: { type: 'string' },
            title: { type: 'string', maxLength: 200 },
            content: { type: 'string', maxLength: 2000 },
            settingId: { type: 'string' }
          },
          required: ['actionType', 'value'],
          errorMessage: {
            properties: _t('validate.actions.items.properties'),
            required: _t('validate.actions.items.required')
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
