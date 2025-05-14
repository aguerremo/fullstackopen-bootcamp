import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'
import { initialUsers } from '../../redux/usersActions'

const UsersList = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(initialUsers())
  }, [dispatch])

  if (!users || users.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersList