import { useDispatch } from 'react-redux'
import { updateBlog } from '../../redux/blogsActions'

const Likes = ({ blog }) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    const updatedBlog = { ...blog, likes: blog.likes +1 }
    dispatch(updateBlog(updatedBlog))
    console.log('succes!', updatedBlog)
  }


  return (
    <div>
      <em>Likes:</em> {blog.likes} {}
      <button onClick={handleClick}>❤</button>
    </div>
  )
}

export default Likes
