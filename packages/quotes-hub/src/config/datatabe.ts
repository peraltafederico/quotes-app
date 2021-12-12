import mongoose from 'mongoose'

export const configDB = () => {
  mongoose.connect('mongodb://localhost:27017/quotes_hub')

  const db = mongoose.connection

  db.on('error', () => {
    // eslint-disable-next-line no-console
    console.error('connection error: ')
  })
  db.once('open', () => {
    // eslint-disable-next-line no-console
    console.log('Connected successfully')
  })
}
