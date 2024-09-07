const testUser = {
  name: 'tester',
  username: 'testuser',
  password: 'Password1!'
}

const testBlog = {
  title: 'a blog title',
  author: 'a blog author',
  url: 'a blog url'
}

const severalBlogs = [
  {
    title: 'First blog title',
    author: 'First blog author',
    url: 'First blog url'
  },
  {
    title: 'Second blog title',
    author: 'Second blog author',
    url: 'Secodn blog url'
  },
  {
    title: 'Third blog title',
    author: 'Third blog author',
    url: 'Third blog url'
  }
]

const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', {name: 'Login'}).click()
}

const postBlog = async (page, title, author, url) => {
  await page.getByRole('button', {name: 'Create blog post'}).click()
  await page.getByTestId('titleInput').fill(title)
  await page.getByTestId('authorInput').fill(author)
  await page.getByTestId('urlInput').fill(url)
  await page.getByRole('button', {name: 'save', exact: true}).click()
}

const postSeveralBlogs = async (page) => {
  // for ... of used here to ensures that each asynchronous operation completes before moving onto the next
  for (const blog of severalBlogs) {
    await postBlog(page, blog.title, blog.author, blog.url);
    await page.getByText(`${blog.title} ${blog.author}`).waitFor();
  }
}

const logout = async (page) => {
  await page.getByRole('button', {name: 'log out'}).click()
}
 
const likeOnBlogDivRandomTimes = async (page, blogDiv, upperTimes) => {
  const numberOfLikes = Math.ceil(Math.random() * upperTimes)
  for (let i = 0; i < numberOfLikes; i++){
    await waitForLikeOnBlogDiv(page, blogDiv)
  }
}

const waitForLikeOnBlogDiv = async (page, blogDiv) => {

  await blogDiv.getByRole('button', {name: 'Show details'}).click()
        
  const responsePromise = page.waitForResponse(res => {
    console.log('THE INFO', res.url(), res.status())
    return (res.url().includes('/api/blogs') && res.status() === 200)
  })
  
  await blogDiv.getByRole('button', {name: 'Like'}).click()

  await responsePromise

  await blogDiv.getByRole('button', {name: 'Hide details'}).click()
}

module.exports = {loginWith, testUser, testBlog, postBlog, postSeveralBlogs, severalBlogs, logout, waitForLikeOnBlogDiv, likeOnBlogDivRandomTimes}