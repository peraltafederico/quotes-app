import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  sentence: String,
  author: String,
  origin: String,
  tags: [String],
})

export default mongoose.model('Quote', schema, 'quotes')
