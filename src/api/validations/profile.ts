import { _t } from 'contexts/i18n'

export const putProfilesSchema = {
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string'
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
      }
    }
  }
}

export const postProfilesChangePasswordSchema = {
  body: {
    type: 'object',
    required: ['oldPassword', 'newPassword'],
    properties: {
      oldPassword: {
        type: 'string',
        maxLength: 20,
        minLength: 6,
        pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,40})',
        errorMessage: {
          maxLength: _t('validate.oldPassword.maxLength'),
          minLength: _t('validate.oldPassword.minLength'),
          pattern: _t('validate.oldPassword.pattern')
        }
      },
      newPassword: {
        type: 'string',
        maxLength: 20,
        minLength: 6,
        pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,40})',
        errorMessage: {
          maxLength: _t('validate.newPassword.maxLength'),
          minLength: _t('validate.newPassword.minLength'),
          pattern: _t('validate.newPassword.pattern')
        }
      }
    }
  }
}

export const putProfilesStateSchema = {
  body: {
    type: 'object',
    properties: {
      state: {
        type: 'string',
        enum: ['busy', 'free'],
        errorMessage: { enum: _t('validate.state.enum') }
      }
    }
  }
}
