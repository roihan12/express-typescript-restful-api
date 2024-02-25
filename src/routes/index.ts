import { Router } from 'express'
import productsRouter from './productsRoute'
import { errorHandling, notFound } from '../controllers/errorController'
import userRouter from './userRoute'

const app = Router()

app.use('/api/v1', productsRouter)
app.use('/api/v1', userRouter)

app.use('*', notFound)
app.use('*', errorHandling)
export default app
