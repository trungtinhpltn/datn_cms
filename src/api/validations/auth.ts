import { _t } from 'contexts/i18n'

export const postAuthForgotPasswordSchema = {
  body: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
        errorMessage: { format: _t('validate.email.format') }
      }
    }
  }
}

export const postAuthLoginWithApiKeySchema = {
  body: {
    type: 'object',
    properties: {
      apiKey: {
        type: 'string'
      }
    }
  }
}

export const postAuthLoginSchema = {
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
        errorMessage: { format: _t('validate.email.format') }
      },
      password: {
        type: 'string',
        maxLength: 20,
        minLength: 6,
        pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,40})',
        errorMessage: {
          maxLength: _t('validate.password.maxLength'),
          minLength: _t('validate.password.minLength'),
          pattern: _t('validate.password.pattern')
        }
      }
    }
  }
}

export const postAuthRefreshTokenSchema = {
  body: {
    type: 'object',
    required: ['refreshToken'],
    properties: {
      refreshToken: {
        type: 'string'
      }
    }
  }
}
