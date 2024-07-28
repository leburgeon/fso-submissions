const mongoose = require('mongoose')

const idValidationMiddlewear = (req, res, next) => {
  const id = req.params.id
  if (!mongoose.isValidObjectId(id)){
    const error = new mongoose.Error.ValidationError(null)
    error.message = 'Invalid ID format'
    return next(error)
  }

  next()

}

const validationErrorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError'){
    res.status(400)
      .json({
        error: err.message
      })
  } else {
    next(err)
  }
}

module.exports = { validationErrorHandler, idValidationMiddlewear }