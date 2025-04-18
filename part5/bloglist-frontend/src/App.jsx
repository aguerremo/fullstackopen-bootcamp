import { useState, useEffect } from 'react'
import Blog from './components/blogs/Blog'
import blogService from './services/blogs'
import { Login } from './components/login/Login'
import { AddBlog } from './components/blogs/AddBlog'
import { Logout } from './components/login/Logout'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({
    author:'',
    title:'',
    url:''
  })
  const [doneMessage, setDoneMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [addBLogVisible, setAddBlogVisible] = useState(null)

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
          setPassword={setPassword} 
          setUsername={setUsername} 
          username={username} 
          password={password} 
          setUser={setUser} 
          setErrorMessage={setErrorMessage} 
          errorMessage={errorMessage}
        />
      ) : (
        <div>
          <h1>Blogs</h1>
          <Logout user={user} setUser={setUser} />
          <br />
          <hr />
          <AddBlog 
            newBlog={newBlog} 
            setNewBlog={setNewBlog} 
            setBlogs={setBlogs} 
            setDoneMessage={setDoneMessage} 
            setErrorMessage={setErrorMessage} 
            errorMessage={errorMessage} 
            doneMessage={doneMessage} 
            addBLogVisible={addBLogVisible}
            setAddBlogVisible={setAddBlogVisible}
          />
          <br />
          <hr />

          <h3>Blog list:</h3>
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
} 

export default App