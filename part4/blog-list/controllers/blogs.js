const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { idValidationMiddlewear, tokenExtractor } = require('../utils/middlewear')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')

blogsRouter.use('/:id', idValidationMiddlewear)

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, id: 1})
  response.json(blogs)
})

blogsRouter.post('/', tokenExtractor, async (req, res, next) => {
  // Retrieves the token from the request body
  const { token } = req

  // Verifies the token using the env SECRET
  const decoded = jwt.verify(token, config.SECRET)

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


blogsRouter.delete('/:id', tokenExtractor, async (req, res, next) => {
  // Retrieves the token from the request body
  const { token } = req

  // Verifies the token using the env SECRET
  const decoded = jwt.verify(token, config.SECRET)

  // If the token is invalid, returns status and error
  if (!(decoded && decoded.id)){
    return res.status(401).json({error: 'token invalid'})
  }

  const user = await User.findById(decoded.id)
  
  const blog = await Blog.findById(req.params.id)

  if (!blog.user.toString() === user._id.toString()){
    const authorizationError = new Error('This user does not have authorisation to perform this action')
    authorizationError.name = 'AuthorisationError'
    return next(authorizationError)
  } 

  // For removing the blog from the list of blog ids on the user
  user.blogs.filter(blogId => blogId.toString() !== blog._id.toString())

  await user.save()

  await Blog.findByIdAndDelete(blog._id)

  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const requestBody = req.body
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {new:true})
  res.status(200).json(updatedBlog)
})

module.exports = blogsRouter