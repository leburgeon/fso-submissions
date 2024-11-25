const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 0,
  },
]

const blogToAdd = {
  title: 'Blog added in test',
  author: 'foody mc bar',
  url: 'http://www.wikileaks.com',
  likes: 17,
}

const initialUser = {
  username: 'groot',
  name: 'rootuser',
  password: 'superStrong10!',
}

const validUser = async () => {
  const users = await User.find({ username: initialUser.username })
  return users[0]
}

const tempToken = async () => {
  const { username, _id: id } = await validUser()

  return jwt.sign({ username, id }, config.SECRET, { expiresIn: 120 })
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blogDoc) => blogDoc.toJSON())
}

const firstBlog = async () => {
  const allBlogs = await blogsInDB()
  return allBlogs[0]
}

module.exports = {
  validUser,
  initialBlogs,
  blogsInDB,
  blogToAdd,
  firstBlog,
  initialUser,
  usersInDb,
  tempToken,
}
