import { useState, useEffect } from 'react'
import Blog from './components/blogs/Blog'
import blogService from './services/blogs'
import { Login } from './components/login/Login'
import { AddBlog } from './components/blogs/AddBlog'
import { Logout } from './components/login/Logout'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

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
        <Login 
          setUser={setUser} 
        />
      ) : (
        <div>
          <h1>Blogs</h1>
          <Logout user={user} setUser={setUser} /><br />
            <hr />
          <AddBlog setBlogs={setBlogs} /><br />
            <hr />
          <h3>Blog list:</h3>
            {blogs.map(blog => (
              <div>
                <Blog key={blog.id} blog={blog} />
              </div>
              
            ))}
        </div>
      )}
    </div>
  )
} 

export default App