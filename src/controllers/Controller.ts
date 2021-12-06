import { Request, Response, NextFunction } from 'express'
import HttpResponse from '../helpers/HttpResponse'
import Service from '../services/Service'

export default class Controller<T> {
  service: Service<T>

  constructor(service: Service<T>) {
    this.service = service
    this.getAll = this.getAll.bind(this)
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { items, ...additionalData } = await this.service.getAll(req.query)

      return new HttpResponse(items, res, {
        ...additionalData,
      }).send()
    } catch (error) {
      return next(error)
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params

      const response = await this.service.get(id)

      return new HttpResponse(response, res).send()
    } catch (error) {
      return next(error)
    }
  }

  async insert(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.service.insert(req.body)

      return new HttpResponse(response, res).send()
    } catch (error) {
      return next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params

      const response = await this.service.update(id, req.body)

      return new HttpResponse(response, res).send()
    } catch (error) {
      return next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params

      const response = await this.service.delete(id)

      return new HttpResponse(response, res).send()
    } catch (error) {
      return next(error)
    }
  }
}
