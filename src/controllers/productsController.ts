import { NextFunction, Request, Response } from 'express'
import { inputProductValidation } from '../validations/productsValidation'

export const getAllProducts = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = [
      {
        id: 1,
        name: 'Product 1',
        stock: 100,
        price: 200000
      },
      {
        id: 2,
        name: 'Product 2',
        stock: 400,
        price: 300000
      },
      {
        id: 3,
        name: 'Product 3',
        stock: 50,
        price: 800000
      }
    ]

    return res.status(200).json({
      error: null,
      message: 'Get all Product successfully',
      data
    })
  } catch (error: Error | unknown) {
    next(
      new Error(
        'Error on src/controller/productController.ts: getAllProducts - ' +
          String((error as Error).message)
      )
    )
  }
}

export const createProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error, value } = inputProductValidation(req.body)
    if (error != null) {
      return res.status(400).json({
        error: error.details[0].message,
        message: 'Input data failed',
        data: value
      })
    }

    return res.status(200).json({
      error: null,
      message: 'input data successfully save',
      data: value
    })
  } catch (error) {
    next(
      new Error(
        'Error on src/controller/productController.ts: createProduct - ' +
          String((error as Error).message)
      )
    )
  }
}
