import Quote from '../models/Quote'
import QuoteService from '../services/QuoteService'
import Controller from './Controller'

export default class QuoteController extends Controller<typeof Quote> {
  constructor() {
    super(new QuoteService())
  }
}
