import {
  deleteProduct,
  getProductById,
  insertProduct,
  updateProduct
} from './../services/productsService'
import { NextFunction, Request, Response } from 'express'
import { inputProductValidation } from '../validations/productsValidation'
import { getProducts } from '../services/productsService'
import ProductsType from '../types/productsType'

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const data: ProductsType[] = await getProducts()

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

export const getDataProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const { id } = req.params
    const data = await getProductById(parseInt(id))

    return res.status(200).json({
      error: null,
      message: 'Get Product by Id successfully',
      data
    })
  } catch (error: Error | unknown) {
    next(
      new Error(
        'Error on src/controller/productController.ts: getDataProductById - ' +
          String((error as Error).message)
      )
    )
  }
}

export const createDataProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const { error, value } = inputProductValidation(req.body)
    if (error != null) {
      return res.status(400).json({
        error: error.details[0].message,
        message: 'Input data failed',
        data: value
      })
    }

    const data = await insertProduct(value)

    return res.status(201).json({
      error: null,
      message: 'create product data successfully save',
      data
    })
  } catch (error: Error | unknown) {
    next(
      new Error(
        'Error on src/controller/productController.ts: createDataProduct - ' +
          String((error as Error).message)
      )
    )
  }
}

export const updateDataProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const { id } = req.params

    const { error, value } = inputProductValidation(req.body)
    if (error != null) {
      return res.status(400).json({
        error: error.details[0].message,
        message: 'Input data failed',
        data: value
      })
    }

    const data = await updateProduct({ ...value, id: parseInt(id) })

    return res.status(201).json({
      error: null,
      message: 'update product data successfully save',
      data
    })
  } catch (error) {
    next(
      new Error(
        'Error on src/controller/productController.ts: updateDataProduct - ' +
          String((error as Error).message)
      )
    )
  }
}

export const deleteDataProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const { id } = req.params
    const data = await deleteProduct(parseInt(id))

    return res.status(200).json({
      error: null,
      message: 'Delete Product successfully',
      data
    })
  } catch (error: Error | unknown) {
    next(
      new Error(
        'Error on src/controller/productController.ts: deleteDataProduct - ' +
          String((error as Error).message)
      )
    )
  }
}
