import web from './middlewares/web'
import 'dotenv/config'

const port: number =
  process.env.PORT != null ? parseInt(process.env.PORT) : 5000

web.listen(port, () => {
  console.log(`Aplication starting on http://localhost:${port}`)
})
