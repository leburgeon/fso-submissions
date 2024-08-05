const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { idValidationMiddlewear } = require('../utils/middlewear')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')

blogsRouter.use('/:id', idValidationMiddlewear)

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, id: 1})
  response.json(blogs)
})

const getTokenFrom = (request) => {
  // Retrieves the value associated with 'authorization' header
  const authorization = request.get('authorization')

  // If the string starts with 'Bearer' (the scheme for authenticating)
  if (authorization && authorization.startsWith('Bearer ')){
    return authorization.replace('Bearer ', '')
  }

  return null
}

blogsRouter.post('/', async (req, res, next) => {
  // Retrieves the token from the request body
  const authToken = getTokenFrom(req)

  if (!authToken){
    return res.status(401).json({error: 'must provide token'})
  }

  // Verifies the token using the env SECRET
  const decoded = jwt.verify(authToken, config.SECRET)

  // If the token is invalid, returns status and error
  if (!(decoded && decoded.id)){
    return res.status(401).json({error: 'token invalid'})
  }

  // Finds the user using the user id in the payload
  const user = await User.findById(decoded.id)

  if (!user){
    return res.status(401).json({error: 'user not found'})
  }

  // Adds the new blog to the server using the request body and the found users id
  const blog = new Blog({...req.body, user: user._id})
  const addedBlog = await blog.save()

  // Adds the id of the new blog to the array of blog ids on the user document and saves the user
  user.blogs.push(addedBlog._id)
  await user.save()

  res.status(201).json(addedBlog)
})


blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const requestBody = req.body
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {new:true})
  res.status(200).json(updatedBlog)
})

module.exports = blogsRouter