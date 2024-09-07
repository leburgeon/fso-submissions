const { test, expect, describe, beforeEach } = require('@playwright/test')
const { Response, loginWith, testUser, testBlog, severalBlogs, postBlog, postSeveralBlogs, logout, likeOnBlogDivRandomTimes } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: testUser
    })
    await page.goto('/')
  })


  test('login form is visible', async ({page}) => {
    await expect(page.getByTestId('loginForm')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, testUser.username, testUser.password)
      await page.getByText(`${testUser.name} logged in`)
    })

    test('fails with incorrect password, and displays notification', async ({ page }) => {
      await loginWith(page, testUser.username, 'wrong password')
      await page.getByText('Failed to log in!')
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, testUser.username, testUser.password)  
    })

    test('user can create a new blog post',async ({ page }) => {
      await postBlog(page, testBlog.title, testBlog.author, testBlog.url)
      await expect(page.getByText(`${testBlog.title} ${testBlog.author}`)).toBeVisible()
    })

    describe('and several blogs exist', () => {
      beforeEach(async ({ page }) => {
        await postSeveralBlogs(page)
      })

      test('those blogs visible', async ({ page }) => {
        for (const blog of severalBlogs){
          await expect(page.getByText(`${blog.title} ${blog.author}`)).toBeVisible()
        }
      })

      test('details are displayed only after the display details button is clicked', async ({ page }) => {
        const blogToDisplay = severalBlogs[0]
        const firstBlogDiv = await page.getByText(`${blogToDisplay.title} ${blogToDisplay.author}`).locator('..')

        expect(firstBlogDiv.getByTestId('infoDiv')).not.toBeVisible()

        await firstBlogDiv.getByRole('button', {name: 'Show details'}).click()

        expect(firstBlogDiv.getByTestId('infoDiv')).toBeVisible()
      })

      test('a blog can be liked and the likes count increases for that blog', async ({ page }) => {
        const blogToLike = severalBlogs[2]
        const thirdBlogDiv = await page.getByText(`${blogToLike.title} ${blogToLike.author}`).locator('..')
        // For displaying the blog details
        await thirdBlogDiv.getByRole('button', {name: 'Show details'}).click()

        // The div displaying number of likes and the button to like
        const likesDiv = thirdBlogDiv.locator('.likesDiv')
        const likeCountSpan = likesDiv.locator('.likeCountSpan')

        await expect(likeCountSpan).toHaveText('0 likes')
        await likesDiv.getByRole('button', {name: 'Like'}).click()
        await expect(likeCountSpan).toHaveText('1 likes')
      })

      test('the user who created the blog can delete a blog using the delete button', async ({ page }) => {
        const blogToDelete = severalBlogs[1]
        const secondBlogDiv = await page.getByText(`${blogToDelete.title} ${blogToDelete.author}`).locator('..')

        page.on('dialog', dialog => dialog.accept())
        await secondBlogDiv.locator('.blogDeleteButton').click()

        await expect(secondBlogDiv).not.toBeVisible()
      })











      test('after the blogs are each liked a random number of times, the blogs are ordered by number of likes', async ({ page }) => {

        const firstBlogDiv = page.locator('.blogDiv').filter({hasText: 'First blog'})
        const secondBlogDiv = page.locator('.blogDiv').filter({hasText: 'Second blog'})
        const thirdBlogDiv = page.locator('.blogDiv').filter({hasText: 'Third blog'})

        await likeOnBlogDivRandomTimes(page, firstBlogDiv, 10)
        await likeOnBlogDivRandomTimes(page, secondBlogDiv, 10)
        await likeOnBlogDivRandomTimes(page, thirdBlogDiv, 10)

        await firstBlogDiv.getByRole('button', {name: 'Show details'}).click()
        await secondBlogDiv.getByRole('button', {name: 'Show details'}).click()
        await thirdBlogDiv.getByRole('button', {name: 'Show details'}).click()

        const arrayOfLikesInDisplayOrder = await page.locator('.likeCountSpan').allInnerTexts()
        const justInts = arrayOfLikesInDisplayOrder.map(string => parseInt(string.slice(0,1)))
        expect(justInts).toStrictEqual(justInts.toSorted().toReversed())
      })
    })












    describe('and a blog exists by antoher user', async () => {
      beforeEach( async ({ page, request }) => {
        await logout(page)
        
        await request.post('/api/users', {
          data: {
            name: '2tester',
            username: '2testuser',
            password: 'Password1!'
          }
        })

        await loginWith(page, '2testuser', 'Password1!')

        await postBlog(page, '2 title', '2 author', '2 url')

        await logout(page)

        await loginWith(page, testUser.username, testUser.password)
      })

      test('the blog is visible', async ({ page }) => {
        await expect(page.getByText('2 title 2 author')).toBeVisible()
      })

      test('delete button not visible on post by other user', async ({ page }) => {
        const blogDiv = await page.locator('.blogDiv')
        await expect(blogDiv.getByRole('button', {name: 'delete'})).not.toBeVisible()
      })
    })
  })
})