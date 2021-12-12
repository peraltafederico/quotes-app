import express from 'express'
import { configDB } from './config/datatabe'
import errorMiddleware from './middlewares/errorMiddleware'
import router from './routes'

const app = express()

app.use(express.json())

configDB()

app.use('/api', router)

app.use(errorMiddleware)

app.listen(3000, () => {
  console.log('Server is running at port 3000')
})
