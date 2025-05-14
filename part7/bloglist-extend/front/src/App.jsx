import { BrowserRouter, Routes, Route, Link } from 'react-router'
import Blogs from './Blogs'

import { BlogDetails } from './components/blogs/BlogDetails'
import UsersList from './components/users/UsersList'
import UserDetails from './components/users/UserDetail'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initialBlogs } from './redux/blogsActions'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialBlogs()) // Carga los blogs al inicializar la aplicación
  }, [dispatch])
  const styles = {
    padding: 5,
  }

  return (
    <BrowserRouter>
      <header>
        <Link to="/" style={styles}>Blogs</Link>
        <Link to="/users" style={styles}>Users</Link>
      </header>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

