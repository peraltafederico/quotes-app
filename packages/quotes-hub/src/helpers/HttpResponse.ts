import { Response } from 'express'

export default class HttpResponse<T = any> {
  status: number

  data: T

  res: Response

  additionalData?: object

  constructor(data: T, res: Response, additionalData?: object, status = 200) {
    this.status = status
    this.data = data
    this.res = res
    this.additionalData = additionalData
  }

  send() {
    this.res.status(this.status).json({
      status: this.status,
      data: this.data,
      ...this.additionalData,
    })
  }
}
