require('dotenv').config()

const MONGO_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGO_URI
    : process.env.MONGO_URI

const PORT = 3003

module.exports = {
  MONGO_URI,
  PORT
}
