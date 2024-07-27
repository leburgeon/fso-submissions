const express = require('express')
// This module extends the Express.js module at runtime, wrapping route handlers in a try-catch block
// Async, await operations can then be used without try-catch in route handlers
// Errors that are thrown are caught by async-errors module and passed to expresses 'next'
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const notesRouter = require('./controllers/blogs')
const config = require('./utils/config')
const logger = require('./utils/logger')
const { validationErrorHandler } = require('./utils/middlewear')

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
app.use(validationErrorHandler)


module.exports = app