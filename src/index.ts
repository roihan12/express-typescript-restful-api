import express, { Application, NextFunction, Request, Response } from 'express'
import 'dotenv/config'

const app: Application = express()
const port: number =
  process.env.PORT != null ? parseInt(process.env.PORT) : 5000

  
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello world!')
})

app.listen(port, () => {
  console.log(`Aplication starting on http://localhost:${port}`)
})
