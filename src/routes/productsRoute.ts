import { Request, Response, Router } from 'express'
import { inputProductValidation } from '../validations/productsValidation'

const productsRouter = Router()

productsRouter.get('/products', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'this product route'
  })
})

productsRouter.post('/products', (req: Request, res: Response) => {
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
})
export default productsRouter
