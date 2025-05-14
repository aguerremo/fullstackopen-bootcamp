import { BrowserRouter, Routes, Route, Link } from 'react-router'
import Blogs from './Blogs'

import { BlogDetails } from './components/blogs/BlogDetails'
import UsersList from './components/users/UsersList'
import UserDetails from './components/users/UserDetail'

const App = () => {
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

