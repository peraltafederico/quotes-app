import express from 'express'
import QuoteController from '../controllers/QuoteController'

const router = express.Router()

const controller = new QuoteController()

router.get('/', controller.getAll)
router.get('/random', controller.getRandom)

export default router
