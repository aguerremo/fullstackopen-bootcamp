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
  const [newBlog, setNewBlog] = useState({
    author:'',
    title:'',
    url:''
  })
  const [doneMessage, setDoneMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


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
     return( 
      <div>
    <Login setPassword={setPassword} setUsername={setUsername} username={username} password={password} user={user} setUser={setUser} setErrorMessage={setErrorMessage} errorMessage={errorMessage}/>
      </div>
     
  )} else {
    return ( 
      <div>
        <h2>blogs</h2>
        <Logout user={user} setUser={setUser}/>
        <AddBlog newBlog={newBlog} setNewBlog={setNewBlog} setBlogs={setBlogs} setDoneMessage={setDoneMessage} setErrorMessage={setErrorMessage} errorMessage={errorMessage} doneMessage={doneMessage} />
        <br />
        <h3>Blog list:</h3>
        <hr></hr>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />

        )}
      </div>    
)}
} 

export default App