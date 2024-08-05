const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { idValidationMiddlewear } = require('../utils/middlewear')

blogsRouter.use('/:id', idValidationMiddlewear)

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, id: 1})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  // Temp getting a valid user id to add to the blog
  const validUser = await User.findOne({})
  // Creates a mongoose document from the request body
  const blog = new Blog({...request.body, user: validUser._id})
  // Awaits for the returned added document from mongo
  const addedBlog = await blog.save()
  // Appends the idObject of the blog to the array of ids on the user
  validUser.blogs.push(addedBlog._id)
  await validUser.save()
  // Sets the response status and sends the response as a json
  response.status(201).json(addedBlog)
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