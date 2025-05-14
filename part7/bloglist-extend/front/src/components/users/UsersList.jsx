import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'
import { initialUsers } from '../../redux/usersActions'
import { Table } from '../style/Table'
import { Paragraph, Subtitle, Title } from '../style/Text'

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
      <Title>Users</Title>
      <Table>
        <thead>
          <tr>
            <Subtitle>Name</Subtitle>
            <Subtitle>Blogs Created</Subtitle>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}><Paragraph>{user.name}</Paragraph></Link>
              </td>
              <td><Paragraph>{user.blogs.length}</Paragraph></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UsersList