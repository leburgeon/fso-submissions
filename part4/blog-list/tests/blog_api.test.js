const app = require('../app')
const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const blog = require('../models/blog')
const mongoose = require('mongoose')

const api = supertest(app)

// For standardising the database before each test is run
beforeEach(async() => {
  await Blog.deleteMany({})
  const promiseArray = helper.initialBlogs.map(blog => new Blog(blog).save())
  await Promise.all(promiseArray)
})

test.only('blogs returned as json', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test.only('correct number of blogs returned', async () => {
  const response = await api.get('/api/blogs')
  assert(response.body.length === helper.initialBlogs.length)
})

test.only('returned blogs have "id" property', async () => {
  const response = await api.get('/api/blogs')
  assert(response.body[0].id)
})


after(async () => {
  await mongoose.connection.close()
})