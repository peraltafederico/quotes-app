import Quote from '../models/Quote'
import Service from './Service'

export default class QuoteService extends Service<typeof Quote> {
  constructor() {
    super(Quote)
  }
}
