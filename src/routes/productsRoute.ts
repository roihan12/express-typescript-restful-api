import { Router } from 'express'
import {
  createDataProduct,
  deleteDataProduct,
  getAllProducts,
  getDataProductById,
  updateDataProduct
} from '../controllers/productsController'
import { authenticated } from '../controllers/errorController'

const productsRouter = Router()

productsRouter.get('/products', authenticated, getAllProducts)
productsRouter.get('/products/:id', authenticated, getDataProductById)
productsRouter.put('/products/:id', authenticated, updateDataProduct)
productsRouter.delete('/products/:id', authenticated, deleteDataProduct)
productsRouter.post('/products', authenticated, createDataProduct)

export default productsRouter
