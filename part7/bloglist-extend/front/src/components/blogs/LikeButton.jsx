import { useDispatch } from 'react-redux'
import { updateBlog } from '../../redux/blogsActions'
import { Button } from '../style/Button'
import { Paragraph } from '../style/Text'

const Likes = ({ blog }) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    const updatedBlog = { ...blog, likes: blog.likes +1 }
    dispatch(updateBlog(updatedBlog))
    console.log('succes!', updatedBlog)
  }


  return (
    <div>
      <Paragraph>Likes: {blog.likes}</Paragraph>
      <Button onClick={handleClick}>❤</Button>
    </div>
  )
}

export default Likes
