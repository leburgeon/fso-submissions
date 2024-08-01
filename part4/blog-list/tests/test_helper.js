const Blog = require('../models/blog')
const initialBlogs =[
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 0
  }
];

const blogToAdd = {
  title: "Blog added in test",
  author: "foody mc bar",
  url: "http://www.wikileaks.com",
  likes: 17
}

const initialUser = {
  username: 'groot',
  name: 'rootuser',
  password: 'superStrong10!',
}


const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blogDoc => blogDoc.toJSON())
}

const firstBlog = async () => {
  const allBlogs = await blogsInDB()
  return allBlogs[0]
}

module.exports = { initialBlogs, blogsInDB, blogToAdd, firstBlog, initialUser }