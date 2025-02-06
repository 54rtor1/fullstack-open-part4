const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')


const mongoose = require('mongoose')


mongoose.connect(config.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message)
  })


app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app
