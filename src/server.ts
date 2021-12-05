import express, { Response } from 'express'
import { configDB } from './config/datatabe'
import HttpError from './helpers/HttpError'
import MultipleErrors from './helpers/MultipleErrors'
import router from './routes'

const httpErrors = {
  '400': 'BadRequest',
  '401': 'Unauthorized',
  '403': 'Forbidden',
  '404': 'NotFound',
  '409': 'Conflict',
  '500': 'InternalServerError',
}

const app = express()

app.use(express.json())

configDB()

app.use('/api', router)

app.use(
  (err: MultipleErrors | HttpError | Error, _: any, res: Response, __: any) => {
    const statusCode = err instanceof HttpError ? err?.status : 500
    const statusMessage =
      httpErrors[String(statusCode) as keyof typeof httpErrors] ||
      httpErrors[500]
    const errors =
      err instanceof MultipleErrors
        ? JSON.parse(err?.message)
        : [
            {
              message: err.message,
            },
          ]

    res.status(statusCode).send({
      statusMessage,
      statusCode,
      errors,
    })
  }
)

app.listen(3000, () => {
  console.log('Server is running at port 3000')
})
