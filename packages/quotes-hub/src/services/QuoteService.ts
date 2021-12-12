import Quote from '../models/Quote'
import Service from './Service'

export default class QuoteService extends Service<typeof Quote> {
  constructor() {
    super(Quote)
    this.getRandom = this.getRandom.bind(this)
  }

  async getRandom() {
    try {
      const total = await this.model.countDocuments()

      const random = Math.floor(Math.random() * total)

      return await this.model.findOne().skip(random)
    } catch (error) {
      console.log('There was an error getting a random quote', error)

      throw error
    }
  }
}
