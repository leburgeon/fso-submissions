const loginRouter = require('express').Router()
const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

loginRouter.post('/', async (req, res, next) => {
  const { username, password } = req.body

  if (!username) {
    return res.status(400).json({ error: 'username required for login' })
  }

  const user = await User.findOne({ username })

  const passwordCorrect =
    user === null ? false : await bcryptjs.compare(password, user.passwordHash)

  if (!passwordCorrect) {
    return res.status(401).json({
      error: 'username or password incorrect',
    })
  }

  const tokenPayload = {
    username,
    id: user._id,
  }

  const token = jwt.sign(tokenPayload, config.SECRET, { expiresIn: 10000 })

  res.status(200).send({ token, username, name: user.name })
})

module.exports = loginRouter
