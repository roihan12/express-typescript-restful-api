import express, { Application } from 'express'
import 'dotenv/config'
import appMiddleware from './middlewares'

const app: Application = express()
const port: number =
  process.env.PORT != null ? parseInt(process.env.PORT) : 5000

app.use(appMiddleware)
app.listen(port, () => {
  console.log(`Aplication starting on http://localhost:${port}`)
})
