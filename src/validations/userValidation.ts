import Joi from 'joi'
import { UserType } from '../types/userType'

export const inputUserValidation = (payload: UserType) => {
  const schema = Joi.object({
    id: Joi.string().trim().allow(null, ''),
    email: Joi.string().trim().required().email().messages({
      'string.base': 'email must string',
      'string.empty': 'email must not be empty',
      'string.email': 'email not valid',
      'any.required': 'email is required'
    }),
    name: Joi.string().trim().required().messages({
      'string.base': 'name must string',
      'string.empty': 'name must not be empty',
      'any.required': 'name is required'
    }),
    password: Joi.string().min(4).max(15).required().messages({
      'string.base': 'password must string',
      'string.empty': 'password must not be empty',
      'string.min': 'password min 4 characters',
      'string.max': 'password max 15 characters',
      'any.required': 'password is required'
    }),
    confirmPassword: Joi.any()
      .equal(Joi.ref('password'))
      .required()
      .label('Confirm Password')
      .messages({
        'any.only': '{{#label}} does not match',
        'any.empty': '{{#label}} must not be empty',
        'any.required': '{{#label}} is required'
      }),

    role: Joi.string().trim().allow(null, '')
  })

  return schema.validate(payload)
}
