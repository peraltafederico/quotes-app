import { NextFunction, Response, Request } from 'express'
import HttpResponse from '../helpers/HttpResponse'
import Quote from '../models/Quote'
import QuoteService from '../services/QuoteService'
import Controller from './Controller'

export default class QuoteController extends Controller<
  typeof Quote,
  QuoteService
> {
  constructor() {
    super(new QuoteService())
    this.getRandom = this.getRandom.bind(this)
  }

  async getRandom(_: Request, res: Response, next: NextFunction) {
    try {
      const random = await this.service.getRandom()

      return new HttpResponse(random, res).send()
    } catch (error) {
      next(error)
    }
  }
}
