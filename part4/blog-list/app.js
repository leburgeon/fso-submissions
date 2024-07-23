const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const notesRouter = require('./controllers/blogs')
const config = require('./utils/config')
const logger = require('./utils/logger')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to mongodb')
  })
  .catch((error) => {
    logger.error('could not connect', error.message)
  })
  
app.use(cors())
app.use(express.json())
app.use('/api/blogs', notesRouter)


module.exports = app