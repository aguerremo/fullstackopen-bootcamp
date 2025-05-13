import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component have this text in the title',
    author: 'Test',
    url: 'www.google.es',
    likes: 0,
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Component have this text in the title')
  screen.debug(element)

  expect(element).toBeDefined()
})

test('renders no content', () => {
  const blog = {
    title: 'Component have this text in the title',
    author: 'Test',
    url: 'www.google.es',
    likes: 0,
  }

  render(<Blog blog={blog} />)

  const element = screen.queryByText('Test')
  screen.debug(element)

  expect(element).toBeDefined()
})

test('clicking the button to show more info', async () => {
  const blog = {
    title: 'Component have this text in the title',
    author: 'Test',
    url: 'www.google.es',
    likes: 0,
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('more info')
  await user.click(button)

  screen.debug(button)
  const author = screen.getByText('close')
  expect(author).toBeDefined()
})
