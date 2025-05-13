import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AddBlog } from './AddBlog'
import { vi } from 'vitest'

// Importamos el servicio para poder mockearlo
import blogService from '../../services/blogs'

// Hacemos mock de todo el servicio
vi.mock('../../services/blogs')

test('<AddBlog /> updates parent state and calls onSubmit', async () => {
  const setBlogs = vi.fn()
  const user = userEvent.setup()

  // Mockeamos la respuesta de create y getAll
  blogService.create.mockResolvedValue({
    author: 'Author Test',
    title: 'Title Test',
    url: 'url Test',
    id: '12345',
  })

  blogService.getAll.mockResolvedValue([
    {
      author: 'Author Test',
      title: 'Title Test',
      url: 'url Test',
      id: '12345',
    },
  ])

  render(<AddBlog setBlogs={setBlogs} />)

  const createButton = screen.getByText('Create Blog')
  await user.click(createButton)

  const authorInput = screen.getByPlaceholderText('write author name here')
  const titleInput = screen.getByPlaceholderText('write blog title here')
  const urlInput = screen.getByPlaceholderText('write url here')

  const sendButton = screen.getByText('Submit')

  await user.type(authorInput, 'Author Test')
  await user.type(titleInput, 'Title Test')
  await user.type(urlInput, 'url Test')

  await user.click(sendButton)

  // Ahora SI setBlogs debe ser llamado
  console.log('setBlogs.mock.calls >>>>>>>>>>>> ', setBlogs.mock.calls)

  expect(setBlogs).toHaveBeenCalledTimes(1)
  expect(setBlogs.mock.calls[0][0]).toEqual([
    {
      author: 'Author Test',
      title: 'Title Test',
      url: 'url Test',
      id: '12345',
    },
  ])
})
