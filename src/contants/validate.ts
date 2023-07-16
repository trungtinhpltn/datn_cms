import { _t } from 'contexts/i18n'
import * as yup from 'yup'

export const validateName = () =>
  yup
    .string()
    .required(_t('validate.name.yup'))
    .max(30, _t('validate.name.length.yup'))

export const validateUsername = () =>
  yup
    .string()
    .required(_t('validate.username.yup'))
    .max(15, _t('validate.username.length.yup'))
    .matches(/^[A-Za-z0-9]*$/, _t('validate.username.matches.yup'))

export const validatePassword = () =>
  yup
    .string()
    .required(_t('validate.password.yup'))
    .max(40, _t('validate.password.lengthmax.yup'))
    .min(6, _t('validate.password.lengthmin.yup'))
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,40})/,
      _t('validate.password.matches.yup')
    )

export const validateConfirmPassword = (
  field = _t('validate.confirmpassword.newpassword')
) => {
  return yup
    .string()
    .required(_t('validate.confirmpassword.yup'))
    .max(40, _t('validate.confirmpassword.lengthmax.yup'))
    .min(6, _t('validate.confirmpassword.lengthmin.yup'))
    .oneOf([yup.ref(field), null], _t('validate.confirmpassword.oneof.yup'))
}

export const validateDifferentPassword = (
  field = _t('validate.different.newpassword')
) => {
  return yup
    .string()
    .required(_t('validate.different.yup'))
    .max(40, _t('validate.different.lengthmax.yup'))
    .min(6, _t('validate.different.lengthmin.yup'))
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,40})/,
      _t('validate.different.matches.yup')
    )
    .notOneOf([yup.ref(field), null], _t('validate.different.notoneof.yup'))
}

export const validateEmail = () =>
  yup
    .string()
    .required(_t('validate.email.yup'))
    .max(40, _t('validate.email.length.yup'))
    .email(_t('validate.emailerr.yup'))

export const validatePhone = () =>
  yup
    .string()
    .required(_t('validate.phone.yup'))
    .max(15, _t('validate.phone.length.yup'))
    // .min(10, "SDT tối thiểu 10 ký tự!")
    .matches(/^(84|0[3|5|7|8|9])[0-9]{8,13}$/, {
      message: _t('validate.phone.matches.yup'),
      excludeEmptyString: true
    })

export const validateRequired = (label?: string) =>
  yup
    .string()
    .nullable()
    .required(
      _t('validate.required.yup', {
        values: { fieldName: label }
      })
    )

export const validateNumber = (label: string) =>
  yup
    .number()
    .typeError('Vui lòng nhập số!')
    .nullable()
    .required(
      _t('validate.required.yup', {
        values: { fieldName: label }
      })
    )

export const validateDiscountPrice = (label: string) =>
  yup
    .number()
    .nullable(true)
    .default(0)
    .max(yup.ref(label), 'Giá khuyến mãi phải nhỏ hơn hoặc bằng giá gốc')

export const validateConfiguration = yup.object({
  configuration: yup
    .string()
    .nullable()
    .required(_t('validate.configuration.yup')),
  name: yup.string().required(_t('validate.configuration.name.yup')),
  description: yup
    .string()
    .required(_t('validate.configuration.description.yup')),
  conditions: yup.array(
    yup.object().shape({
      typeCondition: yup
        .string()
        .nullable()
        .required(_t('validate.configuration.typeCondition.yup')),
      condition: yup
        .string()
        .nullable()
        .required(_t('validate.configuration.condition.yup')),
      valueCondition: yup
        .string()
        .nullable()
        .required(_t('validate.configuration.valueCondition.yup'))
    })
  ),
  actions: yup.array(
    yup.object().shape({
      action: yup
        .string()
        .nullable()
        .required(_t('validate.configuration.action.yup')),
      valueAction: yup
        .string()
        .nullable()
        .required(_t('validate.configuration.valueAction.yup')),
      topicAction: yup
        .string()
        .required(_t('validate.configuration.topicAction.yup')),
      contentAction: yup
        .string()
        .required(_t('validate.configuration.contentAction.yup'))
    })
  )
})

export const validateProject = yup.object({
  nameProject: validateName(),
  categoryComom: yup.string().required(_t('validate.project.category')),
  categories: yup.array(
    yup.object().shape({
      category: yup.string()
    })
  )
})

export const validateFormTicket = yup.object({
  assignee: yup.string().nullable().required(_t('validate.configuration.yup')),
  status: yup.string().nullable().required(_t('validate.configuration.yup')),
  category: yup.string().nullable().required(_t('validate.configuration.yup')),
  note: yup.string().required(_t('validate.configuration.yup'))
})

export const validateEmailSetting = yup.object({
  projectID: validateRequired(_t('validate.emailsetting.project')),
  autoReply: yup.object().shape({
    titleReply: yup.string().when('isAutoReply', {
      is: true,
      then: yup.string().required(_t('validate.emailsetting.titleerply'))
    }),
    contentReply: yup.string().when('isAutoReply', {
      is: true,
      then: yup.string().required(_t('validate.emailsetting.contentreply'))
    })
  }),
  signature: yup.object().shape({
    contentSignature: yup.string().when('isSignature', {
      is: true,
      then: yup.string().required(_t('validate.emailsetting.contentsignature'))
    })
  })
})

export const validateFacebookSetting = yup.object({
  projectID: validateRequired(_t('validate.emailsetting.project')),
  convertCommentToTicket: yup.string().when('radioBox', {
    is: '2',
    then: yup.string().required(_t('validate.configurationfacebook.radiobox'))
  })
})

export const validateZaloSetting = yup.object({
  projectID: validateRequired(_t('validate.emailsetting.project'))
})

export const validateSetting = yup.object({
  autoReply: yup.object().shape({
    contentReply: yup.string().when('isAutoReply', {
      is: true,
      then: yup
        .string()
        .max(500, _t('validate.settinglivechat.maxcontentreply'))
        .required(_t('validate.settinglivechat.contentreply'))
    }),
    contentReplyAfterWork: yup.string().when('isAutoReply', {
      is: true,
      then: yup
        .string()
        .max(500, _t('validate.settinglivechat.maxcontentreply'))
    })
  }),
  imageLogo: yup.mixed().required(_t('validate.settinglivechat.image')),
  chooseTime: yup.object().shape({
    timeStart: yup.string().when('isChooseTime', {
      is: true,
      then: yup.string().required(_t('validate.settinglivechat.timestart'))
    }),
    timeEnd: yup.string().when('isChooseTime', {
      is: true,
      then: yup.string().required(_t('validate.settinglivechat.timeend'))
    })
  })
})

export const schemaCreateUser = yup.object({
  name: validateName(),
  email: validateEmail(),
  numberPhone: validatePhone(),
  projectID: yup.array().nullable().required(_t('validate.empty')),
  roleID: yup.string().nullable().required(_t('validate.empty'))
})

export const validateEditContact = yup.object({
  name: validateName(),
  accountManage: yup.string().required(_t('validate.empty')),
  typeClient: yup.array().nullable().required(_t('validate.empty')),
  email: validateEmail(),
  numberPhone: validatePhone(),
  socials: yup.array(
    yup.object().shape({
      social: yup.string()
    })
  )
})
