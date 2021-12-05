import express, { Response } from 'express'
import { HTTP_ERRORS } from './config/constants'
import { configDB } from './config/datatabe'
import HttpError from './helpers/HttpError'
import MultipleErrors from './helpers/MultipleErrors'
import router from './routes'

const app = express()

app.use(express.json())

configDB()

app.use('/api', router)

app.use(
  (err: MultipleErrors | HttpError | Error, _: any, res: Response, __: any) => {
    const code = err instanceof HttpError ? err?.status : 500
    const name =
      HTTP_ERRORS[String(code) as keyof typeof HTTP_ERRORS] || HTTP_ERRORS[500]
    const errors =
      err instanceof MultipleErrors
        ? JSON.parse(err?.message)
        : [
            {
              message: err.message,
            },
          ]

    res.status(code).send({
      name,
      code,
      errors,
    })
  }
)

app.listen(3000, () => {
  console.log('Server is running at port 3000')
})
