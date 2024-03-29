import Joi from 'joi'
import ProductsType from '../types/productsType'

export const inputProductValidation = (
  payload: ProductsType
): Joi.ValidationResult<ProductsType> => {
  const schema = Joi.object({
    name: Joi.string().trim().required().messages({
      'string.base': 'product name must string',
      'string.empty': 'product name must not be empty',
      'any.required': 'product name is required'
    }),
    stock: Joi.number().required().positive().messages({
      'number.base': 'product stock must number',
      'number.empty': 'product stock must not be empty',
      'any.required': 'product stock is required'
    }),
    price: Joi.number().required().positive().messages({
      'number.base': 'product price must number',
      'number.empty': 'product price must not be empty',
      'any.required': 'product price is required'
    }),
    productById: Joi.string().trim().allow(null, '')
  })

  return schema.validate(payload)
}
