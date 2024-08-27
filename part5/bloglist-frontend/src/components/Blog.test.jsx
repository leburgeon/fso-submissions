import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { describe, expect } from 'vitest'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {

  let container

  const mockHandleLike = vi.fn()

  const mockHandleDelete = vi.fn()

  beforeEach(() => {
    const blog = {
      title: 'a blog title',
      author: 'a blog author',
      url: 'a blog url',
      likes: 55,
      user: {
        username: 'ablogusersname'
      }
    }

    container = render(<Blog blog={blog}
      handleLike={mockHandleLike}
      handleDelete={mockHandleDelete}/>).container
  })

  test('after render, title and author displayed, but not likes, url, or userdetails', async () => {
    const titleAndAuthorDiv = container.querySelector('.titleAndAuthorDiv')
    expect(titleAndAuthorDiv).toBeDefined()
    expect(titleAndAuthorDiv).not.toHaveStyle('display: none')

    const infoDiv = container.querySelector('.infoDiv')
    expect(infoDiv).toBeDefined()
    expect(infoDiv).toHaveStyle('display: none')
  })

  test('after the show button is clicked, likes/url/user details are shown', async () => {
    const showButton = container.querySelector('.showButton')

    const user = userEvent.setup()
    await user.click(showButton)

    const infoDiv = container.querySelector('.infoDiv')
    expect(infoDiv).not.toHaveStyle('display: none')
  })

  test('when the like button is pressed twice, the event handler is called twice', async () => {
    // Wont click show button first to test how user-events work
    const user = userEvent.setup()
    const showButton = container.querySelector('.showButton')
    await user.click(showButton)

    const likeButton = container.querySelector('.likeButton')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandleLike.mock.calls).toHaveLength(2)
  })

})

