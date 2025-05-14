import blogService from '../../services/blogs'
import { setNotification } from '../../redux/notificationActions'
import { useDispatch } from 'react-redux'
import { removeBlog } from '../../redux/blogsActions'

const Remove = ({ user, blog }) => {
  const dispatch = useDispatch()
  if (!user || !blog.user) {
    return null // no renderizar nada si falta información
  }

  const userId = user.id
  const blogUserId = blog.user.id

  const handleRemove = () => {
    dispatch(removeBlog(blog))
    dispatch(setNotification(blog.title + ' removed successfully', 'success',6))
  }

  if (userId !== blogUserId) {
    return null // no mostrar botón si no es el mismo usuario
  }

  return <button onClick={handleRemove}>Remove Blog</button>
}

export default Remove
