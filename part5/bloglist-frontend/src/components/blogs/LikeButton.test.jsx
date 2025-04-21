import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Likes from './LikeButton'

test('clicking the button twice add two likes', async () => {
  const newLikes = 0

  const mockHandler = vi.fn()

  render(<Likes newLikes={newLikes} addLike={mockHandler}/>)

  const user = userEvent.setup()
  const button = screen.getByText('❤')
  await user.click(button)
  await user.click(button)

  screen.debug(button)
  expect(mockHandler.mock.calls).toHaveLength(2)


})