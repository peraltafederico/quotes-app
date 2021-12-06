import express from 'express'
import QuoteController from '../controllers/QuoteController'

const router = express.Router()

router.get('/', new QuoteController().getAll)

export default router
