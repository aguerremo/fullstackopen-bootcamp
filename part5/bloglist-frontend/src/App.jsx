import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { Login } from './Login'
import { AddBlog } from './components/AddBlog'
import { Logout } from './components/Logout'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newAuthor, setNewAuthor] = useState('')
  const [newBlog, setNewBlog] = useState([author,title,url])


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

  if (user === null) {
     return( <Login setPassword={setPassword} setUsername={setUsername} username={username} password={password} user={user} setUser={setUser}/>

  )} else {
    return ( 
      <div>
        <h2>blogs</h2>
        <Logout user={user} setUser={setUser}/>
        <AddBlog newAuthor={newAuthor} newBlog={newBlog} setNewAuthor={setNewAuthor} setNewBlog={setNewBlog} />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />

        )}
      </div>    
)}
} 

export default App