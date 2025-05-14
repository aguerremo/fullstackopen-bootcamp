import { useState, useEffect } from 'react'
import BlogList from './components/blogs/BlogList'
import blogService from './services/blogs'
import { Login } from './components/login/Login'
import { AddBlog } from './components/blogs/AddBlog'
import { Logout } from './components/login/Logout'
import { Title } from './components/style/Text'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      {user === null ? (
        <Login setUser={setUser} />
      ) : (
        <div>
          <Title>Blogs</Title>
          <Logout user={user} setUser={setUser} />
          <br />
          <hr />
          <AddBlog />
          <br />
          <hr />
          <BlogList user={user} />
        </div>
      )}
    </div>
  )
}

export default App
