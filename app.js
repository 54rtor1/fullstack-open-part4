const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')


mongoose.connect(config.MONGO_URI)
.then(() => {
  logger.info('Connected to MongoDB')
})
.catch((error) => {
  logger.error('Error connecting to MongoDB:', error.message)
})


app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
