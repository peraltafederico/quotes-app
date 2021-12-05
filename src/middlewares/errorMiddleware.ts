import { NextFunction, Request, Response } from 'express'
import { HTTP_ERRORS } from '../config/constants'
import HttpError from '../helpers/HttpError'
import MultipleErrors from '../helpers/MultipleErrors'

export default (
  err: MultipleErrors | HttpError | Error,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __: NextFunction
) => {
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
