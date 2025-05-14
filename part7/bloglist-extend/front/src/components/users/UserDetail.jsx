import { useParams } from 'react-router'
import { useSelector } from 'react-redux'

const UserDetails = () => {
  const { id } = useParams()
  const users = useSelector((state) => state.users)

  if (!users) {
    return <div>Loading...</div>
  }

  const user = users.find((user) => user.id === id)

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Added Blogs</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserDetails