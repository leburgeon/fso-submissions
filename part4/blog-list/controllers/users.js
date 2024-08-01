const User = require('../models/user')
const usersRouter = require('express').Router()
const bcryptjs = require('bcryptjs')

usersRouter.post('/', async (req, res, next) => {
  const { username, name, password } = req.body

  // Validates length of password and returns 400 if not valid
  if (password.length <= 3){
    return res.status(400).json({error : 'password must be > length 3'})
  }

  const passwordHash = await bcryptjs.hash(password, 10)

  const newUser = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await newUser.save()

  res.status(201).json(savedUser)
})

usersRouter.get('/', async (req, res, next) => {
  const users = await User.find({}).populate('blogs')

  res.json(users)
})


module.exports = usersRouter 