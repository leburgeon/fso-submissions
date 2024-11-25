import { render, screen } from '@testing-library/react'
import { beforeEach, expect } from 'vitest'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('<BlogForm />', async () => {
  let container

  const mockHandleCreateBlog = vi.fn()

  beforeEach(() => {
    mockHandleCreateBlog.mockClear()
    container = render(
      <BlogForm handleCreateBlog={mockHandleCreateBlog} />
    ).container
  })

  test('creating a blog calls the handle create blog with the correct arguments', async () => {
    const blog = {
      title: 'a blog title',
      author: 'a blog author',
      url: 'www.ablogurl.com'
    }

    const user = userEvent.setup()

    const titleInput = container.querySelector('.titleInput')
    const authorInput = container.querySelector('.authorInput')
    const urlInput = container.querySelector('.urlInput')
    const submitButton = container.querySelector('.submitButton')

    await user.type(titleInput, blog.title)
    await user.type(authorInput, blog.author)
    await user.type(urlInput, blog.url)
    await user.click(submitButton)

    expect(mockHandleCreateBlog).toHaveBeenCalledOnce()
    expect(mockHandleCreateBlog).toHaveBeenCalledWith(blog)
  })
})
