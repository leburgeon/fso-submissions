const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  // Creates a mongoose document from the request body
  const blog = new Blog(request.body)
  // Awaits for the returned added document from mongo
  const addedBlog = await blog.save()
  // Sets the response status and sends the response as a json
  response.status(201).json(addedBlog)
})

module.exports = blogsRouter