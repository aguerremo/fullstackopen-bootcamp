import blogService from '../../services/blogs'

const Remove = ({ setBlogs, user, blog }) => {
  if (!user || !blog.user) {
    return null // no renderizar nada si falta información
  }

  const userId = user.id
  const blogUserId = blog.user.id

  const removeBlog = async (event) => {
    event.preventDefault()
    try {
      await blogService.remove(blog.id)
      setBlogs(prevBlogs => prevBlogs.filter(b => b.id !== blog.id))
    } catch (error) {
      console.log('Error: ', error)
    }
  }
  console.log(user)
  console.log('user id', userId)
  console.log('blog user id', blogUserId)


  if (userId !== blogUserId) {
    return null // no mostrar botón si no es el mismo usuario
  }

  return (
    <button onClick={removeBlog}>Remove Blog</button>
  )
}

export default Remove
