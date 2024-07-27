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

const blogWithoutLikesProperty = {
  title: "A blog that is added in test without likes property",
  author: "foody mc bar",
  url: "http://www.wikileaks.com",
}

const blogsInDB = async () => {
  return await Blog.find({})
}

module.exports = { initialBlogs, blogsInDB, blogToAdd, blogWithoutLikesProperty }