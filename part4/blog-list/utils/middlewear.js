const validationErrorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError'){
    res.status(400)
      .json({
        error: err.message
      })
  }
  next()
}

module.exports = { validationErrorHandler }