const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((prev, curr) => prev + curr.likes, 0) || 0
}

const favoriteBlog = (blogs) => {
  // Returns null if the array of blogs is empty
  if (blogs.length < 1) {
    return null
  }
  // toSorted returns a new array in descending likes order and then the method returns the first blog in that array
  return blogs.toSorted((a, b) => b.likes - a.likes)[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
