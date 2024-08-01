const mongoose = require('mongoose')
const logger = require('../utils/logger')
const { passwordStrength } = require('check-password-strength')

const idValidationMiddlewear = (req, res, next) => {
  const id = req.params.id
  if (!mongoose.isValidObjectId(id)){
    const error = new mongoose.Error.ValidationError(null)
    error.message = 'Invalid ID format'
    return next(error)
  }
  next()
}

const newPasswordValidator = (req, res, next) => {
  const password = req.body.password

  if (!password){
    const passwordError = new Error('password required')
    passwordError.name = 'PasswordValidationError'
    return next(passwordError)
  }

  const strength = passwordStrength(password).id
  if (strength < 1){
    const passwordError = new Error('password too weak, try again')
    passwordError.name = 'PasswordValidationError'
    return next(passwordError)
  }
  next()
}

const errorHandler = (err, req, res, next) => {
  logger.error(err.message)
  if (err.name === 'ValidationError'){
    return res.status(400)
      .json({error: err.message})
      .end()
  } else if (err.name === 'MongoServerError' && err.message.includes('E11000 duplicate key error')){
    res.status(400).send({error: 'username must be unique'})
    .end()
  } else if (err.name === 'PasswordValidationError'){
    res.status(400).send({error: err.message})
  }
  next(err)
}

module.exports = { errorHandler, idValidationMiddlewear, newPasswordValidator }