import { Router } from 'express'
import {
  createDataProduct,
  deleteDataProduct,
  getAllProducts,
  getDataProductById,
  updateDataProduct
} from '../controllers/productsController'

const productsRouter = Router()

productsRouter.get('/products', getAllProducts)
productsRouter.get('/products/:id', getDataProductById)
productsRouter.put('/products/:id', updateDataProduct)
productsRouter.delete('/products/:id', deleteDataProduct)
productsRouter.post('/products', createDataProduct)

export default productsRouter
