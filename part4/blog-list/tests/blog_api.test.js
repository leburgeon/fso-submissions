const app = require('../app')
const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const blog = require('../models/blog')
const mongoose = require('mongoose')
const { application } = require('express')

const api = supertest(app)

// For standardising the database before each test is run
beforeEach(async() => {
  await Blog.deleteMany({})
  const promiseArray = helper.initialBlogs.map(blog => new Blog(blog).save())
  await Promise.all(promiseArray)
})

test('blogs returned as json', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct number of blogs returned', async () => {
  const response = await api.get('/api/blogs')
  assert(response.body.length === helper.initialBlogs.length)
})

test('returned blogs have "id" property', async () => {
  const response = await api.get('/api/blogs')
  assert(response.body[0].id)
})

test('adding a blog increases number of blogs in db', async () => {

  await api.post('/api/blogs')
    .send(helper.blogToAdd)
  
  const blogsInDB = await helper.blogsInDB()

  assert.strictEqual(blogsInDB.length, helper.initialBlogs.length + 1)
})

test('blog contents contains the added blog', async () => {
  const blogToAdd = helper.blogToAdd

  await api.post('/api/blogs')
    .send(blogToAdd)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const blogsInDB = await helper.blogsInDB()

  const blogContents = blogsInDB.map(blog => blog.content)

  assert(blogContents.includes(blogToAdd.content))
})

test('blogs with missing likes default to zero', async () => {
   const response = await api.post('/api/blogs')
    .send(helper.blogWithoutLikesProperty)
  const addedBlog = response.body
  assert.strictEqual(addedBlog.likes, 0)
})

test.only('blogs added with missing title returns 400 bad request', async () => {
  const blogToAdd = helper.blogToAdd
  delete blogToAdd.title

  await api.post('/api/blogs')
    .send(blogToAdd)
    .expect(400)
})

test.only('blogs added with missing url return 400 bad request')

after(async () => {
  await mongoose.connection.close()
})