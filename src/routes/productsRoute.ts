import { Router } from 'express'
import {
  createProduct,
  getAllProducts
} from '../controllers/productsController'

const productsRouter = Router()

productsRouter.get('/products', getAllProducts)

productsRouter.post('/products', createProduct)
export default productsRouter
