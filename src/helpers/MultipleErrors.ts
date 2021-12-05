import HttpError from './HttpError'

export default class MultipleErrors extends HttpError {
  constructor(errors: string[], status = 500) {
    const message = JSON.stringify(
      errors.map((error) => ({
        message: error,
      }))
    )

    super(message, status)
  }
}
