import { Router } from 'express'
import productsRouter from './productsRoute'

const app = Router()

app.use('/api/v1', productsRouter)

export default app
