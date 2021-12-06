/* eslint-disable no-param-reassign */
import mongoose, { Model } from 'mongoose'
import { Request } from 'express'
import { HttpError } from '../helpers'

export default class Service<T> {
  model: Model<T>

  constructor(model: Model<T>) {
    this.model = model
    this.getAll = this.getAll.bind(this)
  }

  async getAll(query: Request<any, any, any, any>['query']) {
    try {
      const { page = 1, limit = 10, sortBy = null } = query

      delete query.skip
      delete query.limit
      delete query.sortBy

      if (query.id) {
        try {
          // eslint-disable-next-line no-underscore-dangle
          query._id = new mongoose.mongo.ObjectId(query.id)
          delete query.id
        } catch (error) {
          throw new Error('No valid id')
        }
      }

      const items = await this.model
        .find(query)
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .sort(sortBy)

      const total = await this.model.countDocuments(query)

      return {
        items,
        totalCount: total,
        isLastPage: total <= page * limit,
      }
    } catch (error) {
      console.error('There was an error getting items', error)

      throw error
    }
  }

  async get(id: string) {
    try {
      const item = await this.model.findById(id)

      if (!item) {
        throw new HttpError('Item not found', 404)
      }

      return item
    } catch (error) {
      console.error('There was an error getting the item', error)

      throw error
    }
  }

  async insert(data: T) {
    try {
      const item = await this.model.create(data)

      if (item) {
        return item
      }

      throw new Error('Something wrong happened')
    } catch (error) {
      console.error('There was an error creating item', error)

      throw error
    }
  }

  async update(id: string, data: T) {
    try {
      return await this.model.findByIdAndUpdate(id, data, { new: true })
    } catch (error) {
      console.error('There was an error updating the item', error)

      throw error
    }
  }

  async delete(id: string) {
    try {
      const item = await this.model.findByIdAndDelete(id)

      if (!item) {
        throw new HttpError('Item not found', 404)
      } else {
        return item
      }
    } catch (error) {
      console.error('There was an error deleting the item', error)

      throw error
    }
  }
}
